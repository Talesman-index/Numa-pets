import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ARTICLES } from '../data/articles';
import { Clock, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';

export const JournalPage = ({ onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = [
    { id: 'all', label: 'Tous les guides' },
    { id: 'dog', label: 'Guides Chiens' },
    { id: 'cat', label: 'Guides Chats' },
    { id: 'care', label: 'Soin & Hygiène' }
  ];

  const filteredArticles = ARTICLES.filter((art) => {
    if (selectedTag === 'all') return true;
    return art.categoryTag === selectedTag;
  });

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Le Journal NÜMA' }]} onNavigate={onNavigate} />

        {/* Hero Header Journal */}
        <div className="reveal-up" style={{ backgroundColor: '#4E0000', border: '1px solid rgba(255,174,1,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', marginBottom: 'var(--space-10)', boxShadow: 'var(--shadow-md)', color: '#FFFFFF' }}>
          <div className="carepaw-nl-tag" style={{ margin: '0 auto var(--space-3)' }}>
            <span>GUIDES &amp; CONSEILS VÉTÉRINAIRES</span>
          </div>
          <h1 className="paws-section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Le Journal NÜMA
          </h1>
          <p className="paws-section-lead" style={{ margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}>
            Des conseils concrets, sans jargon et rédigés avec des professionnels pour accompagner le quotidien, le confort et le soin de votre animal.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="reveal-fade" style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginBottom: 'var(--space-12)', flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTag(t.id)}
              className={`btn ${selectedTag === t.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 22px', fontSize: '13px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="paws-journal-grid stagger-children">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="paws-journal-card"
              onClick={() => onNavigate(`article-${art.slug}`)}
              role="button"
              tabIndex={0}
            >
              <div className="paws-journal-img-wrap">
                <img src={art.image} alt={art.title} className="paws-journal-img" loading="lazy" />
                <span className="paws-journal-tag">{art.category}</span>
              </div>
              <div className="paws-journal-body">
                <div className="paws-journal-meta">
                  <Clock size={13} color="#FF6B00" />
                  <span>{art.readTime} de lecture</span>
                </div>
                <h2 className="paws-journal-title">{art.title}</h2>
                <p className="paws-journal-excerpt">{art.excerpt}</p>
                <div className="paws-journal-cta">
                  <span>Lire le guide complet</span>
                  <div className="paws-journal-arrow">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
