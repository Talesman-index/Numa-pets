import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ARTICLES } from '../data/articles';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Clock, Calendar, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

export const ArticleDetailPage = ({ slug, onNavigate }) => {
  const { products } = useStore();
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  const relatedProducts = products.filter((p) =>
    article.relatedProductIds?.includes(p.id)
  );

  const breadcrumbsItems = [
    { label: 'Le Journal', route: 'conseils' },
    { label: article.title }
  ];

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Breadcrumbs items={breadcrumbsItems} onNavigate={onNavigate} />

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onNavigate('conseils')}
          style={{ marginBottom: 'var(--space-8)', borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
        >
          <ArrowLeft size={14} />
          <span>Retour à tous les guides</span>
        </button>

        {/* Article Header Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
            <span className="badge badge-bestseller">
              {article.category}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} color="#FF6B00" /> {article.readTime}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calendar size={14} /> {article.date}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif-display)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 400, color: '#141414', lineHeight: 1.15, marginBottom: 'var(--space-4)' }}>
            {article.title}
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {article.excerpt}
          </p>
        </div>

        {/* Hero Image */}
        <div style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', marginBottom: 'var(--space-10)', aspectRatio: '16 / 9', boxShadow: 'var(--shadow-md)' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Formatted Content Body */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: 'var(--shadow-sm)', fontSize: '1.05rem', lineHeight: 1.8, color: '#2A2824' }}>
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={idx} style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.8rem', fontWeight: 400, color: '#141414', marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)', borderBottom: '2px solid rgba(255, 107, 0, 0.15)', paddingBottom: '8px' }}>
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF6B00', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote
                  key={idx}
                  style={{
                    borderLeft: '4px solid #FF6B00',
                    backgroundColor: 'var(--color-bg-hero)',
                    padding: 'var(--space-5) var(--space-6)',
                    margin: 'var(--space-6) 0',
                    borderRadius: '0 var(--radius-lg) var(--radius-lg) 0',
                    fontStyle: 'italic',
                    color: '#141414'
                  }}
                >
                  {paragraph.replace('> ', '')}
                </blockquote>
              );
            }
            return (
              <p key={idx} style={{ marginBottom: 'var(--space-4)' }}>
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Cross-Sell at the bottom of article */}
      {relatedProducts.length > 0 && (
        <div className="container" style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
            <div className="paws-section-badge" style={{ margin: '0 auto var(--space-2)' }}>
              <Sparkles size={12} />
              <span>Sélection NÜMA Recommandée</span>
            </div>
            <h2 className="paws-section-title" style={{ fontSize: '2.2rem' }}>
              Les indispensables liés à ce guide
            </h2>
          </div>

          <div className="products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
