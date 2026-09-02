import React from 'react';
import { ShieldCheck, Truck, Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';

export const ValueProps = ({ onNavigate }) => {
  const pillars = [
    {
      num: '01',
      title: 'Sélection resserrée',
      desc: 'NÜMA vous propose 18 essentiels indispensables pour vous épargner des heures de recherche superflue.',
      icon: <Sparkles size={20} />
    },
    {
      num: '02',
      title: 'Conception anatomique',
      desc: 'NÜMA vous propose des équipements qui respectent leur morphologie et préservent leurs articulations.',
      icon: <ShieldCheck size={20} />
    },
    {
      num: '03',
      title: 'Formules clean & douces',
      desc: 'NÜMA vous propose des soins au pH physiologique, sans alcool ni agents agressifs pour leur peau.',
      icon: <HeartHandshake size={20} />
    },
    {
      num: '04',
      title: 'Stock & Expédition en France',
      desc: 'NÜMA vous propose une livraison rapide et soignée sous 24/48h directement depuis notre entrepôt français.',
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
              Ce que NÜMA vous garantit<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>au quotidien.</span>
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
