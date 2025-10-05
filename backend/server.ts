import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './db';

const app = express();
app.use(cors());
app.use(express.json());

// Captura errores no manejados
process.on('uncaughtException', err => console.error('❗ Uncaught:', err));
process.on('unhandledRejection', err => console.error('❗ Unhandled:', err as any));

/**
 * HEALTHCHECK
 * Verifica que el backend y la BD responden
 */
app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, dbTime: (rows as any)[0].now });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message || String(e) });
  }
});

/**
 * CRUD ALUMNOS
 * Adaptado a la tabla `alumno` en `gestionalumnos`
 */
app.get('/api/alumnos', async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM alumno ORDER BY id_alumno DESC');
  res.json(rows);
});

app.get('/api/alumnos/:id', async (req, res) => {
  const [rows]: any = await pool.query('SELECT * FROM alumno WHERE id_alumno=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
  res.json(rows[0]);
});

app.post('/api/alumnos', async (req, res) => {
  const { nombre, apellido, email, documento, fecha_nacimiento, telefono } = req.body;
  const [result]: any = await pool.query(
    'INSERT INTO alumno (nombre, apellido, email, documento, fecha_nacimiento, telefono) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, email, documento, fecha_nacimiento, telefono]
  );
  res.status(201).json({ id_alumno: result.insertId, nombre, apellido, email, documento, fecha_nacimiento, telefono });
});

app.put('/api/alumnos/:id', async (req, res) => {
  const { nombre, apellido, email, documento, fecha_nacimiento, telefono } = req.body;
  await pool.query(
    'UPDATE alumno SET nombre=?, apellido=?, email=?, documento=?, fecha_nacimiento=?, telefono=? WHERE id_alumno=?',
    [nombre, apellido, email, documento, fecha_nacimiento, telefono, req.params.id]
  );
  res.json({ message: 'Actualizado' });
});

app.delete('/api/alumnos/:id', async (req, res) => {
  await pool.query('DELETE FROM alumno WHERE id_alumno=?', [req.params.id]);
  res.json({ message: 'Eliminado' });
});

// Arranque del servidor
const PORT = Number(process.env['PORT'] ?? 3000);
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
