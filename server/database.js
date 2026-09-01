import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'database.db');

let db;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

export function initDb() {
  const db = getDb();

  // ── Users ──────────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      email       TEXT    UNIQUE NOT NULL,
      password_hash TEXT  NOT NULL,
      first_name  TEXT    NOT NULL DEFAULT '',
      last_name   TEXT    NOT NULL DEFAULT '',
      phone       TEXT    NOT NULL DEFAULT '',
      role        TEXT    NOT NULL DEFAULT 'customer',
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── Addresses ─────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS addresses (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title      TEXT    NOT NULL DEFAULT 'Domicile',
      street     TEXT    NOT NULL DEFAULT '',
      city       TEXT    NOT NULL DEFAULT '',
      zip        TEXT    NOT NULL DEFAULT '',
      country    TEXT    NOT NULL DEFAULT 'France',
      is_default INTEGER NOT NULL DEFAULT 0
    );
  `);

  // ── Products ───────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id                 TEXT PRIMARY KEY,
      slug               TEXT UNIQUE NOT NULL,
      title              TEXT NOT NULL,
      subtitle           TEXT NOT NULL DEFAULT '',
      animal             TEXT NOT NULL DEFAULT 'dog',
      category           TEXT NOT NULL DEFAULT 'walk',
      category_label     TEXT NOT NULL DEFAULT '',
      need               TEXT NOT NULL DEFAULT '',
      price              REAL NOT NULL DEFAULT 0,
      subscription_price REAL NOT NULL DEFAULT 0,
      rating             REAL NOT NULL DEFAULT 5,
      review_count       INTEGER NOT NULL DEFAULT 0,
      in_stock           INTEGER NOT NULL DEFAULT 1,
      stock_quantity     INTEGER NOT NULL DEFAULT 0,
      is_best_seller     INTEGER NOT NULL DEFAULT 0,
      is_essential       INTEGER NOT NULL DEFAULT 0,
      is_new             INTEGER NOT NULL DEFAULT 0,
      is_recurring       INTEGER NOT NULL DEFAULT 0,
      description        TEXT NOT NULL DEFAULT '',
      highlights         TEXT NOT NULL DEFAULT '[]',
      how_to_use         TEXT NOT NULL DEFAULT '',
      materials          TEXT NOT NULL DEFAULT '',
      safety_info        TEXT NOT NULL DEFAULT '',
      shipping_info      TEXT NOT NULL DEFAULT '',
      cross_sell_ids     TEXT NOT NULL DEFAULT '[]',
      images             TEXT NOT NULL DEFAULT '[]',
      variants           TEXT NOT NULL DEFAULT '[]',
      created_at         TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── Reviews ────────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT    NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
      author     TEXT    NOT NULL,
      rating     INTEGER NOT NULL DEFAULT 5,
      title      TEXT    NOT NULL DEFAULT '',
      text       TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);


  // ── Orders ─────────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id              TEXT    PRIMARY KEY,
      user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
      status          TEXT    NOT NULL DEFAULT 'confirmed',
      status_tag      TEXT    NOT NULL DEFAULT 'confirmed',
      shipping_method TEXT    NOT NULL DEFAULT '',
      tracking_number TEXT    NOT NULL DEFAULT '',
      subtotal        REAL    NOT NULL DEFAULT 0,
      shipping_fee    REAL    NOT NULL DEFAULT 0,
      discount_amount REAL    NOT NULL DEFAULT 0,
      total           REAL    NOT NULL DEFAULT 0,
      created_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── Order Items ────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id   TEXT    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT    NOT NULL,
      title      TEXT    NOT NULL,
      variant    TEXT    NOT NULL DEFAULT '',
      price      REAL    NOT NULL DEFAULT 0,
      quantity   INTEGER NOT NULL DEFAULT 1,
      image      TEXT    NOT NULL DEFAULT ''
    );
  `);

  // ── Subscriptions ──────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id       INTEGER REFERENCES users(id) ON DELETE SET NULL,
      product_id    TEXT    NOT NULL,
      title         TEXT    NOT NULL,
      format        TEXT    NOT NULL DEFAULT '',
      image         TEXT    NOT NULL DEFAULT '',
      price         REAL    NOT NULL DEFAULT 0,
      frequency     TEXT    NOT NULL DEFAULT 'Tous les 2 mois',
      next_delivery TEXT    NOT NULL DEFAULT '',
      status        TEXT    NOT NULL DEFAULT 'Actif',
      created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── Discounts ──────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS discounts (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      code        TEXT    UNIQUE NOT NULL,
      type        TEXT    NOT NULL DEFAULT 'percent',
      value       REAL    NOT NULL DEFAULT 0,
      min_order   REAL    NOT NULL DEFAULT 0,
      description TEXT    NOT NULL DEFAULT '',
      is_active   INTEGER NOT NULL DEFAULT 1
    );
  `);

  // ── Favorites ──────────────────────────────────────────────────────────────
  db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id TEXT    NOT NULL,
      UNIQUE(user_id, product_id)
    );
  `);

  seedData(db);
  console.log('✅ Database initialized');
  return db;
}

// ── Seed ───────────────────────────────────────────────────────────────────
function seedData(db) {
  // Seed discount codes (idempotent)
  const defaultDiscounts = [
    { code: 'NUMA10',    type: 'percent',      value: 10, min_order: 0,  description: '10% de réduction de bienvenue' },
    { code: 'NUMA20',    type: 'percent',      value: 20, min_order: 60, description: '20% dès 60 € d\'achat' },
    { code: 'MOKI10',    type: 'percent',      value: 10, min_order: 0,  description: '10% parrainage' },
    { code: 'LIVRAISON', type: 'free_shipping', value: 0,  min_order: 0,  description: 'Livraison offerte' },
  ];

  const insertDiscount = db.prepare(`
    INSERT OR IGNORE INTO discounts (code, type, value, min_order, description)
    VALUES (@code, @type, @value, @min_order, @description)
  `);
  for (const d of defaultDiscounts) insertDiscount.run(d);

  // Seed products from the JS data file (imported at runtime)
  seedProducts(db);
}

async function seedProducts(db) {
  const existing = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (existing.count > 0) return; // already seeded

  try {
    // Dynamically import the product data
    const { INITIAL_PRODUCTS } = await import('../src/data/products.js');

    const insertProduct = db.prepare(`
      INSERT OR IGNORE INTO products (
        id, slug, title, subtitle, animal, category, category_label, need,
        price, subscription_price, rating, review_count, in_stock, stock_quantity,
        is_best_seller, is_essential, is_new, is_recurring,
        description, highlights, how_to_use, materials, safety_info, shipping_info,
        cross_sell_ids, images, variants
      ) VALUES (
        @id, @slug, @title, @subtitle, @animal, @category, @categoryLabel, @need,
        @price, @subscriptionPrice, @rating, @reviewCount, @inStock, @stockQuantity,
        @isBestSeller, @isEssential, @isNew, @isRecurring,
        @description, @highlights, @howToUse, @materials, @safetyInfo, @shippingInfo,
        @crossSellIds, @images, @variants
      )
    `);

    const insertReview = db.prepare(`
      INSERT INTO reviews (product_id, author, rating, title, text, created_at)
      VALUES (@productId, @author, @rating, @title, @text, @created_at)
    `);

    for (const p of INITIAL_PRODUCTS) {
      insertProduct.run({
        id: p.id,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle || '',
        animal: p.animal,
        category: p.category,
        categoryLabel: p.categoryLabel || '',
        need: p.need || '',
        price: p.price,
        subscriptionPrice: p.subscriptionPrice || p.price,
        rating: p.rating || 5,
        reviewCount: p.reviewCount || 0,
        inStock: p.inStock ? 1 : 0,
        stockQuantity: p.stockQuantity || 0,
        isBestSeller: p.isBestSeller ? 1 : 0,
        isEssential: p.isEssential ? 1 : 0,
        isNew: p.isNew ? 1 : 0,
        isRecurring: p.isRecurring ? 1 : 0,
        description: p.description || '',
        highlights: JSON.stringify(p.highlights || []),
        howToUse: p.howToUse || '',
        materials: p.materials || '',
        safetyInfo: p.safetyInfo || '',
        shippingInfo: p.shippingInfo || '',
        crossSellIds: JSON.stringify(p.crossSellIds || []),
        images: JSON.stringify(p.images || []),
        variants: JSON.stringify(p.variants || []),
      });

      // Seed initial reviews (let SQLite autoincrement the id)
      for (const rev of (p.reviews || [])) {
        const parts = (rev.date || '').split('/');
        const isoDate = parts.length === 3
          ? `2026-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}T00:00:00.000Z`
          : new Date().toISOString();
        insertReview.run({
          productId: p.id,
          author: rev.author,
          rating: Number(rev.rating),
          title: rev.title || '',
          text: rev.text,
          created_at: isoDate,
        });
      }
    }

    console.log(`✅ Seeded ${INITIAL_PRODUCTS.length} products`);
  } catch (err) {
    console.error('⚠️  Product seed error:', err.message);
  }
}


