import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const EssentialsGrid = ({ onNavigate }) => {
  const { products } = useStore();
  const [filter, setFilter] = useState('all');

  // Filter 6 featured items
  const filteredProducts = products.filter((p) => {
    if (filter === 'dog') return p.animal === 'dog';
    if (filter === 'cat') return p.animal === 'cat';
    return true;
  }).slice(0, 6);

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-brand-primary)' }}>
              Les Best-Sellers
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-brand-deep)', marginTop: 'var(--space-1)' }}>
              Nos Essentiels les plus plébiscités
            </h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('all')}
            >
              Tous (18)
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'dog' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('dog')}
            >
              Chien
            </button>
            <button
              type="button"
              className={`btn btn-sm ${filter === 'cat' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter('cat')}
            >
              Chat
            </button>
          </div>
        </div>

        {/* 6 Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('nos-essentiels')}
          >
            <span>Voir toute la collection (18 références)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
