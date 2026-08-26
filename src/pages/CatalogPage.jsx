import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ArrowUpDown, Sparkles } from 'lucide-react';

export const CatalogPage = ({ onNavigate, filterParams = {} }) => {
  const { products } = useStore();
  const [selectedAnimal, setSelectedAnimal] = useState(filterParams.animal || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filterParams.category || 'all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(100);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [recurringOnly, setRecurringOnly] = useState(filterParams.recurringOnly || false);

  const animalFilters = [
    { id: 'all', label: 'Tous les animaux' },
    { id: 'dog', label: 'Chiens' },
    { id: 'cat', label: 'Chats' }
  ];

  const categoryFilters = [
    { id: 'all', label: 'Tous les besoins' },
    { id: 'walk', label: 'Promenade' },
    { id: 'care', label: 'Soin' },
    { id: 'hygiene', label: 'Hygiène' },
    { id: 'play', label: 'Jeu' },
    { id: 'comfort', label: 'Confort' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (selectedAnimal === 'all' ? true : p.animal === selectedAnimal))
      .filter((p) => (selectedCategory === 'all' ? true : p.category === selectedCategory))
      .filter((p) => (recurringOnly ? p.isRecurring : true))
      .filter((p) => p.price <= maxPrice)
      .filter((p) => (onlyInStock ? p.inStock : true))
      .sort((a, b) => {
        if (selectedSort === 'popular') return (b.reviewCount || 0) - (a.reviewCount || 0);
        if (selectedSort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (selectedSort === 'price-asc') return a.price - b.price;
        if (selectedSort === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [products, selectedAnimal, selectedCategory, recurringOnly, maxPrice, onlyInStock, selectedSort]);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Nos Essentiels' }]} onNavigate={onNavigate} />

        {/* Catalog Hero Banner */}
        <div className="reveal-up" style={{ backgroundColor: '#4E0000', border: '1px solid rgba(255,174,1,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', marginBottom: 'var(--space-10)', textAlign: 'center', boxShadow: 'var(--shadow-md)', color: '#FFFFFF' }}>
          <div className="carepaw-nl-tag" style={{ margin: '0 auto var(--space-3)' }}>
            <span>SÉLECTION COURTE &amp; ÉTHIQUE</span>
          </div>
          <h1 className="paws-section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Nos Essentiels pour Chiens & Chats
          </h1>
          <p className="paws-section-lead" style={{ margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}>
            15 à 20 références rigoureusement sélectionnées. Zéro alimentation, zéro médicament, uniquement ce qui compte.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="reveal-fade" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-6)', marginBottom: 'var(--space-8)', boxShadow: 'var(--shadow-sm)' }}>
          {/* Animal Selector */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
            {animalFilters.map((af) => (
              <button
                key={af.id}
                type="button"
                onClick={() => setSelectedAnimal(af.id)}
                className={`btn ${selectedAnimal === af.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '8px 20px', fontSize: '13px' }}
              >
                {af.label}
              </button>
            ))}
          </div>

          {/* Need/Category Selector */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            {categoryFilters.map((cf) => (
              <button
                key={cf.id}
                type="button"
                onClick={() => setSelectedCategory(cf.id)}
                className={`btn ${selectedCategory === cf.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
              >
                {cf.label}
              </button>
            ))}
          </div>

          {/* Fine Controls (Price, in stock, recurring, sort) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#141414' }}>
                {filteredProducts.length} référence{filteredProducts.length > 1 ? 's' : ''}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
                <label htmlFor="catalog-price-filter" style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                  Budget max : <span style={{ color: '#FF6B00', fontWeight: 800 }}>{maxPrice} €</span>
                </label>
                <input
                  id="catalog-price-filter"
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ cursor: 'pointer', accentColor: '#FF6B00' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  style={{ accentColor: '#FF6B00' }}
                />
                <span>En stock uniquement</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={recurringOnly}
                  onChange={(e) => setRecurringOnly(e.target.checked)}
                  style={{ accentColor: '#FFAE01' }}
                />
                <span>Abonnement disponible (-10%)</span>
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
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="reveal-scale" style={{ textAlign: 'center', padding: 'var(--space-16) 0', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              Aucun produit ne correspond à votre sélection.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedAnimal('all');
                setSelectedCategory('all');
                setMaxPrice(100);
                setOnlyInStock(false);
                setRecurringOnly(false);
              }}
            >
              Réinitialiser tous les filtres
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
