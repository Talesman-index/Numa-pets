import React from 'react';
import { ShieldCheck, Truck, Sparkles, HeartHandshake, ArrowUpRight } from 'lucide-react';

export const ValueProps = ({ onNavigate }) => {
  const pillars = [
    {
      num: '01',
      title: 'Sélection Maîtrisée',
      desc: '15 à 20 produits incontournables minutieusement testés et approuvés. Aucun superflu.',
      icon: <Sparkles size={20} />
    },
    {
      num: '02',
      title: 'Spécialiste Équipement & Hygiène',
      desc: 'Ni croquettes, ni médicaments : nous nous concentrons sur le confort matériel et le soin cutané.',
      icon: <ShieldCheck size={20} />
    },
    {
      num: '03',
      title: 'Vente Directe Éthique',
      desc: 'Pas d’intermédiaires, pas de marges abusives. Une qualité premium au juste prix.',
      icon: <HeartHandshake size={20} />
    },
    {
      num: '04',
      title: 'Expédition sous 24h',
      desc: 'Depuis notre centre logistique en France. Retours simples et gratuits sous 30 jours.',
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
              Pourquoi les maîtres<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>font confiance à MOKI ?</span>
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

          {/* Right Column: Lifestyle Photo & CTA Box */}
          <div className="paws-value-media-wrap">
            <div className="paws-value-img-card">
              <img
                src="/images/hero-golden-duo.jpg"
                alt="Nos engagements MOKI"
                className="paws-value-img"
              />
              <div className="paws-value-floating-card">
                <div className="value-stat-val">99,4%</div>
                <div className="value-stat-label">De satisfaction client certifiée</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
