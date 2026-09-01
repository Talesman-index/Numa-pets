import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { getDb } from '../database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Helper: format DB row → front-end shape
function formatProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    animal: row.animal,
    category: row.category,
    categoryLabel: row.category_label,
    need: row.need,
    price: row.price,
    subscriptionPrice: row.subscription_price,
    rating: row.rating,
    reviewCount: row.review_count,
    inStock: !!row.in_stock,
    stockQuantity: row.stock_quantity,
    isBestSeller: !!row.is_best_seller,
    isEssential: !!row.is_essential,
    isNew: !!row.is_new,
    isRecurring: !!row.is_recurring,
    description: row.description,
    highlights: JSON.parse(row.highlights || '[]'),
    howToUse: row.how_to_use,
    materials: row.materials,
    safetyInfo: row.safety_info,
    shippingInfo: row.shipping_info,
    crossSellIds: JSON.parse(row.cross_sell_ids || '[]'),
    images: JSON.parse(row.images || '[]'),
    variants: JSON.parse(row.variants || '[]'),
  };
}

// GET /api/products
router.get('/', (req, res, next) => {
  try {
    const db = getDb();
    const { animal, category, search } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (animal) { query += ' AND animal = ?'; params.push(animal); }
    if (category) { query += ' AND category = ?'; params.push(category); }
    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY is_best_seller DESC, review_count DESC';

    const rows = db.prepare(query).all(...params);
    res.json(rows.map(formatProduct));
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:slug
router.get('/:slug', (req, res, next) => {
  try {
    const db = getDb();
    const row = db.prepare('SELECT * FROM products WHERE slug = ? OR id = ?')
      .get(req.params.slug, req.params.slug);

    if (!row) return res.status(404).json({ error: 'Produit introuvable.' });

    const product = formatProduct(row);

    // Attach reviews
    const reviews = db.prepare(`
      SELECT id, author, rating, title, text, created_at FROM reviews
      WHERE product_id = ? ORDER BY created_at DESC
    `).all(row.id);

    product.reviews = reviews.map(r => ({
      id: String(r.id),
      author: r.author,
      rating: r.rating,
      title: r.title,
      text: r.text,
      date: new Date(r.created_at).toLocaleDateString('fr-FR'),
    }));

    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products — Admin only
router.post('/', verifyToken, requireAdmin, [
  body('title').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('animal').isIn(['dog', 'cat']),
], (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const db = getDb();
    const p = req.body;
    const id = `prod-${Date.now()}`;
    const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    db.prepare(`
      INSERT INTO products (id, slug, title, subtitle, animal, category, category_label,
        price, subscription_price, stock_quantity, in_stock, description,
        highlights, images, variants)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, slug, p.title, p.subtitle || '', p.animal, p.category || 'walk',
      p.categoryLabel || '', p.price, p.subscriptionPrice || p.price * 0.9,
      p.stockQuantity || 0, p.inStock ? 1 : 1,
      p.description || '', JSON.stringify(p.highlights || []),
      JSON.stringify(p.images || []), JSON.stringify(p.variants || [])
    );

    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.status(201).json(formatProduct(row));
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id — Admin only
router.put('/:id', verifyToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDb();
    const p = req.body;
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Produit introuvable.' });

    db.prepare(`
      UPDATE products SET
        title = ?, subtitle = ?, price = ?, subscription_price = ?,
        stock_quantity = ?, in_stock = ?, description = ?,
        highlights = ?, images = ?, variants = ?,
        is_best_seller = ?, is_new = ?, is_recurring = ?
      WHERE id = ?
    `).run(
      p.title ?? existing.title,
      p.subtitle ?? existing.subtitle,
      p.price ?? existing.price,
      p.subscriptionPrice ?? existing.subscription_price,
      p.stockQuantity ?? existing.stock_quantity,
      p.inStock !== undefined ? (p.inStock ? 1 : 0) : existing.in_stock,
      p.description ?? existing.description,
      p.highlights ? JSON.stringify(p.highlights) : existing.highlights,
      p.images ? JSON.stringify(p.images) : existing.images,
      p.variants ? JSON.stringify(p.variants) : existing.variants,
      p.isBestSeller !== undefined ? (p.isBestSeller ? 1 : 0) : existing.is_best_seller,
      p.isNew !== undefined ? (p.isNew ? 1 : 0) : existing.is_new,
      p.isRecurring !== undefined ? (p.isRecurring ? 1 : 0) : existing.is_recurring,
      req.params.id
    );

    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(formatProduct(row));
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id — Admin only
router.delete('/:id', verifyToken, requireAdmin, (req, res, next) => {
  try {
    const db = getDb();
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ error: 'Produit introuvable.' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
