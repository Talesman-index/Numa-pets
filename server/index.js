import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { initDb } from './database.js';

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import reviewRoutes from './routes/reviews.js';
import orderRoutes from './routes/orders.js';
import subscriptionRoutes from './routes/subscriptions.js';
import userRoutes from './routes/users.js';
import discountRoutes from './routes/discounts.js';

import { errorHandler } from './middleware/errorHandler.js';

const PORT = process.env.PORT || 3001;

// Init DB (runs migrations + seed)
initDb();

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Reviews nested under products: /api/products/:productId/reviews
app.use('/api/products/:productId/reviews', reviewRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/discounts', discountRoutes);

// ── 404 catch-all ─────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route introuvable: ${req.method} ${req.path}` });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 NÜMA API running → http://localhost:${PORT}`);
  console.log(`   Health check → http://localhost:${PORT}/api/health`);
});

export default app;
