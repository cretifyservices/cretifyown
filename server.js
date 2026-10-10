import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Serve static assets from dist if built
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Fallback for SPA routing (Hostinger Web App / Node.js runtime)
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Cretify — Building</title></head>
        <body style="font-family:sans-serif; background:#0A0A0B; color:#fff; display:flex; align-items:center; justify-content:center; height:100vh; margin:0;">
          <div style="text-align:center;">
            <h1>Cretify Web App</h1>
            <p>Application is initializing. Please run "npm run build" to generate production assets.</p>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cretify web app running on port ${PORT}`);
});
