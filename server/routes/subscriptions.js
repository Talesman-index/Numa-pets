import { Router } from 'express';
import { getDb } from '../database.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

function formatSub(s) {
  return {
    id: s.id,
    productId: s.product_id,
    title: s.title,
    format: s.format,
    image: s.image,
    price: s.price,
    frequency: s.frequency,
    nextDelivery: s.next_delivery,
    status: s.status,
  };
}

// GET /api/subscriptions
router.get('/', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const subs = db.prepare('SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC')
      .all(req.user.id);
    res.json(subs.map(formatSub));
  } catch (err) {
    next(err);
  }
});

// POST /api/subscriptions
router.post('/', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const { productId, title, format = '', image = '', price, frequency = 'Tous les 2 mois', nextDelivery = '' } = req.body;

    if (!productId || !price) return res.status(400).json({ error: 'productId et price requis.' });

    const result = db.prepare(`
      INSERT INTO subscriptions (user_id, product_id, title, format, image, price, frequency, next_delivery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, productId, title || '', format, image, price, frequency, nextDelivery);

    const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(formatSub(sub));
  } catch (err) {
    next(err);
  }
});

// PATCH /api/subscriptions/:id — pause / cancel / reactivate
router.patch('/:id', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const { status, frequency, nextDelivery } = req.body;

    const sub = db.prepare('SELECT * FROM subscriptions WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);
    if (!sub) return res.status(404).json({ error: 'Abonnement introuvable.' });

    db.prepare(`
      UPDATE subscriptions SET
        status = COALESCE(?, status),
        frequency = COALESCE(?, frequency),
        next_delivery = COALESCE(?, next_delivery)
      WHERE id = ?
    `).run(status || null, frequency || null, nextDelivery || null, req.params.id);

    const updated = db.prepare('SELECT * FROM subscriptions WHERE id = ?').get(req.params.id);
    res.json(formatSub(updated));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/subscriptions/:id
router.delete('/:id', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM subscriptions WHERE id = ? AND user_id = ?')
      .run(req.params.id, req.user.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Abonnement introuvable.' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
