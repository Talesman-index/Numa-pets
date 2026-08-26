import React from 'react';
import { ShieldCheck, Truck, Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';

export const ValueProps = ({ onNavigate }) => {
  const pillars = [
    {
      num: '01',
      title: 'Sélection maîtrisée',
      desc: 'Une gamme volontairement courte pour faciliter le choix.',
      icon: <Sparkles size={20} />
    },
    {
      num: '02',
      title: 'Des essentiels pour leur quotidien',
      desc: 'Soin, promenade, jeu, hygiène et confort réunis dans une sélection claire.',
      icon: <ShieldCheck size={20} />
    },
    {
      num: '03',
      title: 'Exigences de sécurité',
      desc: 'Les informations de sécurité et de conformité doivent être accessibles pour les produits concernés.',
      icon: <HeartHandshake size={20} />
    },
    {
      num: '04',
      title: 'Stock basé en France',
      desc: 'Une organisation logistique pensée pour faciliter la préparation et l’expédition des commandes.',
      icon: <Truck size={20} />
    }
  ];

  return (
    <section className="section paws-value-section">
      <div className="container">
        
        <div className="paws-value-grid">
          
          {/* Left Column: 4 Pillars in 2x2 grid */}
          <div>
            <div className="paws-section-badge">
              <span>NOS ENGAGEMENTS</span>
            </div>
            
            <h2 className="paws-section-title">
              Pourquoi choisir<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>NÜMA ?</span>
            </h2>

            <div className="paws-pillars-grid">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="paws-pillar-card">
                  <div className="paws-pillar-head">
                    <div className="paws-pillar-num">{pillar.num}</div>
                    <div className="paws-pillar-icon">{pillar.icon}</div>
                  </div>
                  <h3 className="paws-pillar-title">{pillar.title}</h3>
                  <p className="paws-pillar-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Lifestyle Photo & Reassurance Box */}
          <div className="paws-value-media-wrap">
            <div className="paws-value-img-card">
              <img
                src="/images/dog-cat-duo-lifestyle.jpg"
                alt="Nos engagements NÜMA - Chiens et Chats"
                className="paws-value-img"
              />
              <div className="paws-value-floating-card">
                <div className="value-stat-val">18 Essentiels</div>
                <div className="value-stat-label">Sélection courte &amp; maîtrisée pour leur quotidien</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
