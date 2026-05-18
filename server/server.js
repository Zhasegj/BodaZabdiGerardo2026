import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const RSVPS_FILE = join(__dirname, 'data', 'rsvps.json');

function readRSVPs() {
  if (!existsSync(RSVPS_FILE)) return [];
  return JSON.parse(readFileSync(RSVPS_FILE, 'utf-8'));
}

function writeRSVPs(data) {
  writeFileSync(RSVPS_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/rsvp', (req, res) => {
  try {
    const { nombre, asistencia } = req.body;
    if (!nombre || !asistencia) {
      return res.status(400).json({ error: 'nombre y asistencia son requeridos' });
    }

    const rsvps = readRSVPs();
    const newRSVP = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    rsvps.push(newRSVP);
    writeRSVPs(rsvps);

    res.status(201).json({ success: true, data: newRSVP });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar RSVP' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.get('*', (req, res, next) => {
    res.redirect(`http://localhost:5173${req.originalUrl}`);
  });
} else {
  app.use(express.static(join(__dirname, '..', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
