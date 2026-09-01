import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { getDb } from '../database.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

// GET /api/users/me
router.get('/me', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const user = db.prepare('SELECT id, email, first_name, last_name, phone, role FROM users WHERE id = ?')
      .get(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable.' });

    const addresses = db.prepare('SELECT * FROM addresses WHERE user_id = ?').all(user.id);
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
      addresses: addresses.map(a => ({
        id: a.id,
        title: a.title,
        street: a.street,
        city: a.city,
        zip: a.zip,
        country: a.country,
        isDefault: !!a.is_default,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me
router.put('/me', verifyToken, [
  body('email').optional().isEmail(),
  body('firstName').optional().notEmpty(),
  body('lastName').optional().notEmpty(),
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const { firstName, lastName, phone, email } = req.body;

    db.prepare(`
      UPDATE users SET
        first_name = COALESCE(?, first_name),
        last_name  = COALESCE(?, last_name),
        phone      = COALESCE(?, phone),
        email      = COALESCE(?, email)
      WHERE id = ?
    `).run(firstName || null, lastName || null, phone || null, email || null, req.user.id);

    const user = db.prepare('SELECT id, email, first_name, last_name, phone, role FROM users WHERE id = ?')
      .get(req.user.id);

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me/password
router.put('/me/password', verifyToken, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    const valid = await bcrypt.compare(req.body.currentPassword, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });

    const newHash = await bcrypt.hash(req.body.newPassword, 12);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user.id);

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/users/me/addresses
router.post('/me/addresses', verifyToken, [
  body('street').notEmpty(),
  body('city').notEmpty(),
  body('zip').notEmpty(),
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const { title = 'Domicile', street, city, zip, country = 'France', isDefault = false } = req.body;

    if (isDefault) {
      db.prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?').run(req.user.id);
    }

    const result = db.prepare(`
      INSERT INTO addresses (user_id, title, street, city, zip, country, is_default)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, title, street, city, zip, country, isDefault ? 1 : 0);

    const addr = db.prepare('SELECT * FROM addresses WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({
      id: addr.id,
      title: addr.title,
      street: addr.street,
      city: addr.city,
      zip: addr.zip,
      country: addr.country,
      isDefault: !!addr.is_default,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/me/addresses/:id
router.delete('/me/addresses/:id', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?')
      .run(req.params.id, req.user.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Adresse introuvable.' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// GET /api/users/me/favorites
router.get('/me/favorites', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    const favs = db.prepare('SELECT product_id FROM favorites WHERE user_id = ?').all(req.user.id);
    res.json(favs.map(f => f.product_id));
  } catch (err) {
    next(err);
  }
});

// POST /api/users/me/favorites/:productId
router.post('/me/favorites/:productId', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    db.prepare('INSERT OR IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)')
      .run(req.user.id, req.params.productId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/me/favorites/:productId
router.delete('/me/favorites/:productId', verifyToken, (req, res, next) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM favorites WHERE user_id = ? AND product_id = ?')
      .run(req.user.id, req.params.productId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
