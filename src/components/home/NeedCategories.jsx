import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const NeedCategories = ({ onNavigate }) => {
  const categories = [
    {
      id: 'chien',
      tag: 'COLLECTION CHIEN',
      title: 'Équipements & Soins pour Chien',
      desc: 'NÜMA vous propose des harnais en Y anti-traction qui préservent leur trachée, des laisses robustes et des baumes réparateurs.',
      image: '/images/hero-golden-duo.jpg',
      badgeColor: 'var(--color-pastel-green)',
      route: 'chien'
    },
    {
      id: 'chat',
      tag: 'COLLECTION CHAT',
      title: 'Confort & Hygiène pour Chat',
      desc: 'NÜMA vous propose des mousses de soin sans stress, des brosses de mue massantes et des couchages apaisants.',
      image: '/images/cat-lying-happy.png',
      badgeColor: 'var(--color-pastel-teal)',
      route: 'chat'
    },
    {
      id: 'hygiene',
      tag: 'ROUTINE ESSENTIELLE',
      title: 'Packs Soin & Abonnement',
      desc: 'NÜMA vous propose la tranquillité d’esprit avec vos consommables indispensables livrés automatiquement, avec -10%.',
      image: '/images/product-packs-trio.png',
      badgeColor: 'var(--color-pastel-yellow)',
      route: 'nos-essentiels'
    }
  ];

  return (
    <section className="section paws-categories-section">
      <div className="container">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-12)' }}>
          <div className="paws-section-badge">
            <span>PAR UNIVERS</span>
          </div>
          <h2 className="paws-section-title">
            Ce que NÜMA vous propose,<br />
            <span style={{ color: 'var(--color-brand-primary)' }}>pensé pour chaque rituel.</span>
          </h2>
          <p className="paws-section-lead" style={{ margin: '0 auto' }}>
            De la promenade du matin aux moments de repos partagés, découvrez des indispensables créés à hauteur de museau.
          </p>
        </div>

        {/* 3 Large Arched Cards */}
        <div className="paws-arched-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="paws-arched-card"
              onClick={() => onNavigate(cat.route)}
              role="button"
              tabIndex={0}
            >
              <div className="paws-arched-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="paws-arched-img"
                />
              </div>

              <div className="paws-arched-body">
                <span className="paws-card-tag">{cat.tag}</span>
                <h3 className="paws-card-heading">{cat.title}</h3>
                <p className="paws-card-text">{cat.desc}</p>
                <div className="paws-card-cta">
                  <span>Explorer l'univers</span>
                  <div className="paws-card-arrow">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
