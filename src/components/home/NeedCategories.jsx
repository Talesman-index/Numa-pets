import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const NeedCategories = ({ onNavigate }) => {
  const categories = [
    {
      id: 'chien',
      tag: 'COLLECTION CHIEN',
      title: 'Équipements & Soins pour Chien',
      desc: 'Harnais anti-traction, laisses robustes, baumes pour coussinets et shampoings doux.',
      image: '/images/hero-golden-duo.jpg',
      badgeColor: 'var(--color-pastel-green)',
      route: 'chien'
    },
    {
      id: 'chat',
      tag: 'COLLECTION CHAT',
      title: 'Confort & Hygiène pour Chat',
      desc: 'Arbres à chat épurés, brosses de mue, lingettes apaisantes et paniers douillets.',
      image: '/images/cat-lying-happy.png',
      badgeColor: 'var(--color-pastel-teal)',
      route: 'chat'
    },
    {
      id: 'hygiene',
      tag: 'ROUTINE ESSENTIELLE',
      title: 'Packs Soin & Abonnement',
      desc: 'Recevez automatiquement vos consommables indispensables à domicile avec 10% d’économie.',
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
            Tout le nécessaire,<br />
            <span style={{ color: 'var(--color-brand-primary)' }}>sans le superflu.</span>
          </h2>
          <p className="paws-section-lead" style={{ margin: '0 auto' }}>
            Des produits pensés pour faciliter vos rituels quotidiens de promenade, de repos et d'hygiène.
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
