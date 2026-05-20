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

app.post('/api/rsvp', async (req, res) => { // <--- Agregamos 'async' aquí
  try {
    const { nombre, asistencia, email, acompanantes, mensaje } = req.body;
    if (!nombre || !asistencia) {
      return res.status(400).json({ error: 'nombre y asistencia son requeridos' });
    }

    // 1. Tu lógica original: Guarda en el archivo JSON local
    const rsvps = readRSVPs();
    const newRSVP = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    rsvps.push(newRSVP);
    writeRSVPs(rsvps);

    // 2. NUEVA LÓGICA: Enviar una copia a Make en segundo plano
    const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/jmviwtev46tld38xqmajadjw5qfn8jkj"; // <--- PEGA TU URL DE MAKE AQUÍ
    
    // Usamos un fetch asíncrono para enviar los datos a tu Google Sheets
    fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email: email || "No proporcionado",
        asistencia,
        acompanantes: acompanantes || 0,
        mensaje: mensaje || ""
      })
    }).catch(err => console.error("Error enviando a Make/Google Sheets:", err)); 
    // El .catch evita que si Make falla, la app del usuario se quede trabada.

    // 3. Respuesta original al cliente
    res.status(201).json({ success: true, data: newRSVP });
  } catch (error) {
    console.error(error);
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
