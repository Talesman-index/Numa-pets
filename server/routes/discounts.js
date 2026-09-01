import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { getDb } from '../database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/discounts — list (admin) or validate (public with code param)
router.get('/', (req, res, next) => {
  try {
    const db = getDb();
    const { code } = req.query;

    if (code) {
      // Public: validate a specific code
      const discount = db.prepare('SELECT * FROM discounts WHERE code = ? AND is_active = 1')
        .get(code.toUpperCase());
      if (!discount) return res.status(404).json({ error: 'Code promo invalide ou expiré.' });
      return res.json({
        code: discount.code,
        type: discount.type,
        value: discount.value,
        minOrder: discount.min_order,
        description: discount.description,
      });
    }

    // Admin: return all
    const discounts = db.prepare('SELECT * FROM discounts ORDER BY id DESC').all();
    res.json(discounts.map(d => ({
      code: d.code,
      type: d.type,
      value: d.value,
      minOrder: d.min_order,
      description: d.description,
      isActive: !!d.is_active,
    })));
  } catch (err) {
    next(err);
  }
});

// POST /api/discounts — Admin
router.post('/', verifyToken, requireAdmin, [
  body('code').notEmpty().withMessage('Code requis'),
  body('type').isIn(['percent', 'fixed', 'free_shipping']),
  body('value').isFloat({ min: 0 }),
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const { code, type, value, minOrder = 0, description = '' } = req.body;

    db.prepare(`
      INSERT INTO discounts (code, type, value, min_order, description)
      VALUES (?, ?, ?, ?, ?)
    `).run(code.toUpperCase(), type, value, minOrder, description);

    const d = db.prepare('SELECT * FROM discounts WHERE code = ?').get(code.toUpperCase());
    res.status(201).json({ code: d.code, type: d.type, value: d.value, minOrder: d.min_order, description: d.description });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/discounts/:code — Admin
router.delete('/:code', verifyToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM discounts WHERE code = ?').run(req.params.code.toUpperCase());
    if (result.changes === 0) return res.status(404).json({ error: 'Code promo introuvable.' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
