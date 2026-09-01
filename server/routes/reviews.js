import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { getDb } from '../database.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router({ mergeParams: true }); // access :productId from parent

// GET /api/products/:productId/reviews
router.get('/', (req, res, next) => {
  try {
    const db = getDb();
    const { productId } = req.params;

    const product = db.prepare('SELECT id FROM products WHERE id = ? OR slug = ?')
      .get(productId, productId);
    if (!product) return res.status(404).json({ error: 'Produit introuvable.' });

    const reviews = db.prepare(`
      SELECT id, author, rating, title, text, created_at
      FROM reviews WHERE product_id = ?
      ORDER BY created_at DESC
    `).all(product.id);

    res.json(reviews.map(r => ({
      id: String(r.id),
      author: r.author,
      rating: r.rating,
      title: r.title,
      text: r.text,
      date: new Date(r.created_at).toLocaleDateString('fr-FR'),
    })));
  } catch (err) {
    next(err);
  }
});

// POST /api/products/:productId/reviews
router.post('/', [
  body('author').notEmpty().withMessage('Nom requis'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Note entre 1 et 5'),
  body('text').isLength({ min: 10 }).withMessage('Commentaire trop court (min 10 caractères)'),
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const { productId } = req.params;
    const { author, rating, title = '', text } = req.body;

    const product = db.prepare('SELECT id, rating, review_count FROM products WHERE id = ? OR slug = ?')
      .get(productId, productId);
    if (!product) return res.status(404).json({ error: 'Produit introuvable.' });

    // Insert review
    const result = db.prepare(`
      INSERT INTO reviews (product_id, user_id, author, rating, title, text)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(product.id, req.user?.id || null, author, Number(rating), title, text);

    // Recalculate product rating
    const stats = db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count FROM reviews WHERE product_id = ?
    `).get(product.id);

    db.prepare(`
      UPDATE products SET rating = ?, review_count = ? WHERE id = ?
    `).run(Math.round(stats.avg_rating * 10) / 10, stats.count, product.id);

    const newReview = db.prepare('SELECT * FROM reviews WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      id: String(newReview.id),
      author: newReview.author,
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: new Date(newReview.created_at).toLocaleDateString('fr-FR'),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
