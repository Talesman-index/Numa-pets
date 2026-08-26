import React from 'react';
import { ArrowUpRight, Calendar, User, Clock, Sparkles, PawPrint } from 'lucide-react';
import { ARTICLES } from '../../data/articles';

export const JournalTeaser = ({ onNavigate }) => {
  const featuredArticle = ARTICLES[0];
  const listArticles = ARTICLES.slice(1, 4).length > 0 ? ARTICLES.slice(0, 3) : ARTICLES;

  const getArticleAvatar = (idx) => {
    if (idx === 0) return '/images/hero-woman-dog.png';
    if (idx === 1) return '/images/cat-lying-happy.png';
    return '/images/shiba-sunglasses-peeking.png';
  };

  return (
    <section className="section carepaw-journal-section">
      <div className="container">
        
        {/* Section Header Centered */}
        <div className="carepaw-journal-header">
          <div className="carepaw-nl-tag" style={{ margin: '0 auto 12px' }}>
            <span>Le Journal NÜMA</span>
            <PawPrint size={13} />
          </div>
          <h2 className="carepaw-journal-title">Derniers Articles &amp; Conseils</h2>
        </div>

        {/* 2-Columns Grid Layout */}
        <div className="carepaw-journal-grid-layout">
          
          {/* Left Column : 3 Stacked Horizontal Cards */}
          <div className="carepaw-journal-stack">
            {listArticles.map((article, idx) => (
              <div
                key={article.id}
                className="carepaw-h-card"
                onClick={() => onNavigate(`article-${article.slug}`)}
                role="button"
                tabIndex={0}
              >
                {/* Circular Avatar */}
                <div className="carepaw-h-avatar-wrap">
                  <img
                    src={getArticleAvatar(idx)}
                    alt={article.title}
                    className="carepaw-h-avatar-img"
                  />
                </div>

                {/* Content */}
                <div className="carepaw-h-body">
                  <div className="carepaw-h-meta">
                    <span className="carepaw-h-date">
                      <Calendar size={13} color="#FFA726" />
                      <span>{article.date}</span>
                    </span>
                    <span className="carepaw-h-author">
                      <User size={13} color="#FFA726" />
                      <span>{article.author || 'Équipe NÜMA'}</span>
                    </span>
                  </div>
                  <h3 className="carepaw-h-title">{article.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column : 1 Big Featured Split Card */}
          <div
            className="carepaw-featured-card"
            onClick={() => onNavigate(`article-${featuredArticle.slug}`)}
            role="button"
            tabIndex={0}
          >
            {/* Left/Image Side with Peach Background */}
            <div className="carepaw-featured-img-side">
              <img
                src="/images/hero-golden-duo.jpg"
                alt="Guide du mois NÜMA"
                className="carepaw-featured-dog-img"
              />
            </div>

            {/* Right/Text Side */}
            <div className="carepaw-featured-content">
              <div className="carepaw-featured-author">
                <User size={14} color="#FFA726" />
                <span>Par le Dr. Vétérinaire NÜMA</span>
              </div>

              <h3 className="carepaw-featured-title">
                {featuredArticle.title}
              </h3>

              <p className="carepaw-featured-excerpt">
                {featuredArticle.excerpt}
              </p>

              <div className="carepaw-featured-cta">
                <span>En savoir plus</span>
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
