import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], onNavigate }) => {
  return (
    <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', listStyle: 'none', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
        <li>
          <button
            type="button"
            onClick={() => onNavigate('accueil')}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-secondary)' }}
          >
            <Home size={13} />
            <span>Accueil</span>
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <ChevronRight size={12} />
              {isLast || !item.route ? (
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.label}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(item.route)}
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
