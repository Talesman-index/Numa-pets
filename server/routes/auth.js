import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { getDb } from '../database.js';
import { verifyToken, JWT_SECRET } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/register
router.post('/register', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court (min 6 caractères)'),
  body('firstName').notEmpty().withMessage('Prénom requis'),
  body('lastName').notEmpty().withMessage('Nom requis'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone = '' } = req.body;
    const db = getDb();

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cet email.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const result = db.prepare(`
      INSERT INTO users (email, password_hash, first_name, last_name, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run(email, passwordHash, firstName, lastName, phone);

    const user = db.prepare('SELECT id, email, first_name, last_name, phone, role FROM users WHERE id = ?')
      .get(result.lastInsertRowid);

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const db = getDb();

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    // Fetch addresses
    const addresses = db.prepare('SELECT * FROM addresses WHERE user_id = ?').all(user.id);

    res.json({
      token,
      user: {
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
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
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

export default router;
