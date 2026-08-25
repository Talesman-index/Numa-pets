import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Dog, Cat } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal = ({ onNavigate }) => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (slug) => {
    setIsSearchOpen(false);
    onNavigate(`produit-${slug}`);
  };

  const handleCategoryClick = (route) => {
    setIsSearchOpen(false);
    onNavigate(route);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Box */}
        <div className="search-input-wrap">
          <Search size={20} color="var(--color-text-muted)" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Rechercher un harnais, baume, brosse, coussin..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Fermer la recherche"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Filters / Shortcuts */}
        {!query.trim() && (
          <div style={{ padding: 'var(--space-6)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              Accès rapide aux univers
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleCategoryClick('chien')}
              >
                Tout pour Chien
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleCategoryClick('chat')}
              >
                Tout pour Chat
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => handleCategoryClick('nos-essentiels')}
              >
                Tous nos essentiels
              </button>
            </div>

            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              Recherches populaires
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {['Harnais en Y', 'Baume coussinets', 'Shampoing doux', 'Canne à pêche chat', 'Coussin mémoire de forme'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  style={{
                    padding: 'var(--space-1) var(--space-3)',
                    backgroundColor: 'var(--color-surface-subtle)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div className="search-results-list">
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                  Aucun résultat trouvé pour « {query} ». Essayez un autre terme comme "laisse", "shampoing" ou "brosse".
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-muted)', padding: '0 var(--space-2) var(--space-2)' }}>
                  {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
                </div>
                {filtered.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{prod.title}</span>
                          <span className={`badge ${prod.animal === 'dog' ? 'badge-dog' : 'badge-cat'}`}>
                            {prod.animal === 'dog' ? 'Chien' : 'Chat'}
                          </span>
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                          {prod.categoryLabel} — {prod.price.toFixed(2)} €
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} color="var(--color-text-muted)" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
