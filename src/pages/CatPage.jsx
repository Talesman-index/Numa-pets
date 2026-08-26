import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowUpDown, Sparkles } from 'lucide-react';

export const CatPage = ({ onNavigate, initialCategory }) => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const catCategories = [
    { id: 'all', label: 'Tous les essentiels' },
    { id: 'care', label: 'Soin & Toilette' },
    { id: 'play', label: 'Jeux & Instinct' },
    { id: 'comfort', label: 'Arbres & Couchages' },
    { id: 'hygiene', label: 'Propreté & Litière' }
  ];

  const catProducts = useMemo(() => {
    return products.filter((p) => p.animal === 'cat');
  }, [products]);

  const filteredProducts = useMemo(() => {
    return catProducts
      .filter((p) => {
        if (selectedCategory === 'all') return true;
        return p.category === selectedCategory;
      })
      .filter((p) => p.price <= maxPrice)
      .filter((p) => (onlyInStock ? p.inStock : true))
      .sort((a, b) => {
        if (selectedSort === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
        if (selectedSort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (selectedSort === 'price-asc') return a.price - b.price;
        if (selectedSort === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [catProducts, selectedCategory, selectedSort, maxPrice, onlyInStock]);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Collection Chat' }]} onNavigate={onNavigate} />

        {/* Hero Section Chat */}
        <div className="reveal-up" style={{ backgroundColor: '#4E0000', border: '1px solid rgba(255,174,1,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', marginBottom: 'var(--space-10)', textAlign: 'center', boxShadow: 'var(--shadow-md)', color: '#FFFFFF' }}>
          <div className="carepaw-nl-tag" style={{ margin: '0 auto var(--space-3)' }}>
            <span>UNIVERS FÉLIN NÜMA</span>
          </div>
          <h1 className="paws-section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Le confort & l’hygiène de votre chat
          </h1>
          <p className="paws-section-lead" style={{ margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}>
            Brosses anti-mue douces, mousses sans rinçage sans stress, griffoirs minimalistes en chêne et cannes de jeu.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="reveal-fade" style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
          {catCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 22px', fontSize: '13px' }}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 'var(--space-4) var(--space-6)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#141414' }}>
              {filteredProducts.length} référence{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
              <label htmlFor="cat-price-filter" style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                Budget max : <span style={{ color: '#FF6B00', fontWeight: 800 }}>{maxPrice} €</span>
              </label>
              <input
                id="cat-price-filter"
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ cursor: 'pointer', accentColor: '#FF6B00' }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                style={{ accentColor: '#FF6B00' }}
              />
              <span>En stock uniquement</span>
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ArrowUpDown size={14} color="#FF6B00" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="form-input"
              style={{ width: 'auto', padding: '8px 14px', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-full)', fontWeight: 600 }}
              aria-label="Trier les produits"
            >
              <option value="popular">Trier par : Plus plébiscités</option>
              <option value="new">Nouveautés</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="reveal-scale" style={{ textAlign: 'center', padding: 'var(--space-16) 0', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              Aucun produit ne correspond à vos filtres actuels.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(100);
                setOnlyInStock(false);
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="products-grid stagger-children">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
