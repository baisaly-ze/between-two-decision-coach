import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import decisionRoutes from './routes/decisionRoutes.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((item) => item.trim());

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '25kb' }));
app.use('/api', rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Decision Coach API is running', aiConfigured: Boolean(process.env.GROQ_API_KEY) });
});

app.use('/api', decisionRoutes);
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found.' }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
});

export default app;
