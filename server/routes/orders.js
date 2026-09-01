import { Router } from 'express';
import { getDb } from '../database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

function formatOrder(order, items) {
  return {
    id: order.id,
    date: new Date(order.created_at).toLocaleDateString('fr-FR'),
    status: order.status,
    statusTag: order.status_tag,
    shippingMethod: order.shipping_method,
    trackingNumber: order.tracking_number,
    items: items.map(i => ({
      id: i.product_id,
      title: i.title,
      variant: i.variant,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    })),
    subtotal: order.subtotal,
    shippingFee: order.shipping_fee,
    discountAmount: order.discount_amount,
    total: order.total,
  };
}

// GET /api/orders — mes commandes
router.get('/', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC')
      .all(req.user.id);

    const result = orders.map(o => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
      return formatOrder(o, items);
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?')
      .get(req.params.id, req.user.id);

    if (!order) return res.status(404).json({ error: 'Commande introuvable.' });

    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
    res.json(formatOrder(order, items));
  } catch (err) {
    next(err);
  }
});

// POST /api/orders — passer une commande
router.post('/', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const { cart = [], shippingMethod, shippingFee = 0, discountAmount = 0, subtotal, total } = req.body;

    if (!cart.length) return res.status(400).json({ error: 'Panier vide.' });

    const orderId = `NUMA-${Math.floor(10000 + Math.random() * 90000)}`;

    db.prepare(`
      INSERT INTO orders (id, user_id, status, status_tag, shipping_method, subtotal, shipping_fee, discount_amount, total)
      VALUES (?, ?, 'confirmed', 'confirmed', ?, ?, ?, ?, ?)
    `).run(orderId, req.user.id, shippingMethod || '', subtotal || 0, shippingFee, discountAmount, total || 0);

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, title, variant, price, quantity, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of cart) {
      insertItem.run(
        orderId,
        item.id,
        item.title,
        item.variantKey || '',
        item.price,
        item.quantity,
        item.image || ''
      );

      // Decrease stock
      db.prepare('UPDATE products SET stock_quantity = MAX(0, stock_quantity - ?) WHERE id = ?')
        .run(item.quantity, item.id);
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

    res.status(201).json(formatOrder(order, items));
  } catch (err) {
    next(err);
  }
});

// PATCH /api/orders/:id/status — Admin
router.patch('/:id/status', verifyToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDb();
    const { status, statusTag } = req.body;

    const result = db.prepare('UPDATE orders SET status = ?, status_tag = ? WHERE id = ?')
      .run(status, statusTag || status, req.params.id);

    if (result.changes === 0) return res.status(404).json({ error: 'Commande introuvable.' });

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(req.params.id);

    res.json(formatOrder(order, items));
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/admin/all — Admin: toutes les commandes
router.get('/admin/all', verifyToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDb();
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const result = orders.map(o => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
      return formatOrder(o, items);
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
