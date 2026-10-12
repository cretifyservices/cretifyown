import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const BACKUP_FILE = path.join(DATA_DIR, 'projects.backup.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Credentials hashes
const AUTH_USER_HASH = '8ffe0d031860cf208dc3b39a2c91fd4b4ae43c9700d75f5c8cc6ee41c956a8af';
const AUTH_PASS_HASH = '1035ee1b948d0842734013f0d66d864da67d0af215231200b21eeebd4b1229c4';
const PLAIN_USERNAME = 'cretifyservices4508';
const PLAIN_PASSWORD = 'Cretify@4508';

// Secret for HMAC token signing
const TOKEN_SECRET = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

function hashSHA256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function createAdminToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}:${nonce}`;
  const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
  return `${payload}:${signature}`;
}

function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(':');
    if (parts.length !== 3) return false;
    const [timestampStr, nonce, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    // Token valid for 7 days
    if (isNaN(timestamp) || Date.now() - timestamp > 7 * 24 * 60 * 60 * 1000) {
      return false;
    }
    const payload = `${timestampStr}:${nonce}`;
    const expectedSignature = crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

// Admin authentication middleware
function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required' });
    return;
  }

  const token = authHeader.substring(7).trim();
  if (!verifyAdminToken(token)) {
    res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired admin token' });
    return;
  }

  next();
}

// File storage helpers
function readProjects(): any[] {
  try {
    if (fs.existsSync(PROJECTS_FILE)) {
      const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading projects file:', err);
  }

  // Fallback to backup if available
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const content = fs.readFileSync(BACKUP_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading backup file:', err);
  }

  return [];
}

function writeProjects(projects: any[]): boolean {
  try {
    const tempFile = `${PROJECTS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(projects, null, 2), 'utf-8');
    fs.renameSync(tempFile, PROJECTS_FILE);
    return true;
  } catch (err) {
    console.error('Error writing projects file:', err);
    return false;
  }
}

// Enable JSON body parsing
app.use(express.json({ limit: '10mb' }));

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Admin Login
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password, authUserHash, authPassHash } = req.body || {};

  let valid = false;
  if (authUserHash && authPassHash) {
    valid = authUserHash === AUTH_USER_HASH && authPassHash === AUTH_PASS_HASH;
  } else if (username && password) {
    const uHash = hashSHA256(username.trim());
    const pHash = hashSHA256(password.trim());
    valid = (uHash === AUTH_USER_HASH && pHash === AUTH_PASS_HASH) ||
            (username.trim() === PLAIN_USERNAME && password.trim() === PLAIN_PASSWORD);
  }

  if (valid) {
    const token = createAdminToken();
    res.json({
      success: true,
      token,
      message: 'Administrative session established',
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid administrative credentials. Access denied.',
    });
  }
});

// Admin Verify Session
app.get('/api/admin/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, authenticated: false });
    return;
  }
  const token = authHeader.substring(7).trim();
  const valid = verifyAdminToken(token);
  if (valid) {
    res.json({ success: true, authenticated: true });
  } else {
    res.status(401).json({ success: false, authenticated: false });
  }
});

// Public GET Projects - Shared persistent source for all visitors and devices
app.get('/api/projects', (_req: Request, res: Response) => {
  const projects = readProjects();
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json({
    success: true,
    projects,
    count: projects.length,
    timestamp: new Date().toISOString(),
  });
});

// Admin POST Create Project
app.post('/api/projects', requireAdmin, (req: Request, res: Response) => {
  const newProject = req.body;
  if (!newProject || !newProject.title) {
    res.status(400).json({ success: false, error: 'Project title is required' });
    return;
  }

  const projectRecord = {
    id: newProject.id || `work-${Date.now()}`,
    slug: newProject.slug || newProject.id || `work-${Date.now()}`,
    title: String(newProject.title).trim(),
    client: String(newProject.client || '').trim(),
    tagline: String(newProject.tagline || '').trim(),
    category: newProject.category || 'Web Applications',
    categoryLabel: newProject.categoryLabel || `${newProject.category || 'Web Application'}`,
    image: newProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    year: String(newProject.year || new Date().getFullYear()),
    liveUrl: newProject.liveUrl || 'https://',
    keywords: Array.isArray(newProject.keywords) ? newProject.keywords : ['Web App', 'Strategy'],
    featuredOnHome: newProject.featuredOnHome !== false,
  };

  const projects = readProjects();
  const updated = [projectRecord, ...projects];
  const saved = writeProjects(updated);

  if (saved) {
    res.status(201).json({ success: true, project: projectRecord });
  } else {
    res.status(500).json({ success: false, error: 'Failed to write project to persistent storage' });
  }
});

// Admin PUT Update Project
app.put('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const projectId = req.params.id;
  const projectUpdates = req.body;

  if (!projectUpdates) {
    res.status(400).json({ success: false, error: 'Invalid project payload' });
    return;
  }

  const projects = readProjects();
  const index = projects.findIndex((p: any) => p.id === projectId);

  if (index === -1) {
    res.status(404).json({ success: false, error: `Project with id "${projectId}" not found` });
    return;
  }

  const updatedProject = {
    ...projects[index],
    ...projectUpdates,
    id: projectId, // preserve original id
  };

  projects[index] = updatedProject;
  const saved = writeProjects(projects);

  if (saved) {
    res.json({ success: true, project: updatedProject });
  } else {
    res.status(500).json({ success: false, error: 'Failed to update project in storage' });
  }
});

// Admin DELETE Project
app.delete('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
  const projectId = req.params.id;
  const projects = readProjects();
  const filtered = projects.filter((p: any) => p.id !== projectId);

  if (filtered.length === projects.length) {
    res.status(404).json({ success: false, error: `Project with id "${projectId}" not found` });
    return;
  }

  const saved = writeProjects(filtered);
  if (saved) {
    res.json({ success: true, message: `Project ${projectId} removed` });
  } else {
    res.status(500).json({ success: false, error: 'Failed to delete project from storage' });
  }
});

// Admin Reset Projects to Backup
app.post('/api/projects/reset', requireAdmin, (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(BACKUP_FILE)) {
      const backupContent = fs.readFileSync(BACKUP_FILE, 'utf-8');
      const backupProjects = JSON.parse(backupContent);
      writeProjects(backupProjects);
      res.json({ success: true, projects: backupProjects });
      return;
    }
  } catch (err) {
    console.error('Error resetting projects:', err);
  }
  res.status(500).json({ success: false, error: 'Failed to reset projects' });
});

// ----------------------------------------------------
// FRONTEND SERVING (DEV & PROD)
// ----------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.join(__dirname, 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (isProd || (!process.env.VITE_DEV && fs.existsSync(indexPath) && !process.env.npm_lifecycle_event?.includes('dev'))) {
    console.log('[Server] Running in production static mode');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(indexPath);
    });
  } else {
    console.log('[Server] Mounting Vite dev middleware');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Cretify Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Cretify Server] Failed to start:', err);
  process.exit(1);
});
