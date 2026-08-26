import React from 'react';
import { Check, ArrowRight, RefreshCw, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const RecurringSubscriptionTeaser = ({ onNavigate }) => {
  const { addToCart } = useStore();

  const plans = [
    {
      id: 'pack-duo-hygiene',
      name: 'Pack Routine Hygiène',
      target: 'Chien & Chat',
      frequency: 'Toutes les 6 semaines',
      price: '34,90 €',
      originalPrice: '38,90 €',
      features: [
        '1x Shampoing Doux au pH neutre',
        '1x Boîte de 100 Lingettes biodégradables',
        '1x Baume réparateur coussinets',
        'Livraison offerte à chaque envoi',
        'Sans engagement, résiliable en 1 clic'
      ],
      isPopular: true
    },
    {
      id: 'pack-promenade-clean',
      name: 'Pack Sortie & Propreté',
      target: 'Chien',
      frequency: 'Tous les 2 mois',
      price: '22,50 €',
      originalPrice: '25,00 €',
      features: [
        '180x Sacs à déjections 100% compostables',
        '1x Spray assainissant pattes sans rinçage',
        '1x Lingettes nettoyantes express',
        'Livraison prioritaire incluse',
        'Pause ou décalage gratuit'
      ],
      isPopular: false
    },
    {
      id: 'pack-soin-pelage',
      name: 'Pack Mue & Pelage Soyeux',
      target: 'Chat & Chien',
      frequency: 'Tous les 3 mois',
      price: '44,00 €',
      originalPrice: '49,00 €',
      features: [
        '1x Brosse ergonomique anti-mue',
        '1x Lotion démêlante bio sans rinçage',
        '1x Gant de massage et nettoyage',
        'Guide d’entretien du poil offert',
        'Garantie satisfait ou remboursé 30j'
      ],
      isPopular: false
    }
  ];

  const handleSubscribe = (plan) => {
    addToCart({
      id: plan.id,
      title: `${plan.name} (Abonnement)`,
      price: parseFloat(plan.price.replace(' €', '').replace(',', '.')),
      image: '/images/product-packs-trio.png',
      isSubscription: true,
      subscriptionFrequency: plan.frequency
    }, 1);
    onNavigate('panier');
  };

  return (
    <section className="section paws-subscription-section">
      <div className="container">
        
        {/* Header with Product Packaging Visual */}
        <div className="paws-sub-header-grid">
          <div>
            <div className="paws-section-badge">
              <span>LIVRAISON AUTOMATIQUE</span>
            </div>
            <h2 className="paws-section-title">
              Vos indispensables,<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>automatiquement renouvelés.</span>
            </h2>
            <p className="paws-section-lead">
              Recevez vos consommables du quotidien (shampoings, lingettes, sacs à déjections, soins) à la fréquence de votre choix, sans rupture et sans engagement.
            </p>

            <div className="paws-sub-reassurance-row">
              <div className="sub-reassurance-item">
                <RefreshCw size={16} color="var(--color-brand-primary)" />
                <span>Fréquence au choix (4 sem. à 3 mois)</span>
              </div>
              <div className="sub-reassurance-item">
                <Clock size={16} color="var(--color-brand-primary)" />
                <span>Modifiable ou annulable en 1 clic</span>
              </div>
              <div className="sub-reassurance-item">
                <ShieldCheck size={16} color="var(--color-brand-primary)" />
                <span>Expédition directe depuis la France</span>
              </div>
            </div>
          </div>

          {/* Real Product Packs Visual */}
          <div className="paws-sub-img-box">
            <img
              src="/images/product-packs-trio.png"
              alt="Packs d'entretien et de soin NÜMA"
              className="paws-sub-product-img"
            />
            <div className="paws-sub-badge-float">
              <span>LIVRAISON RÉCURRENTE SANS ENGAGEMENT</span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="paws-pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`paws-pricing-card ${plan.isPopular ? 'popular' : ''}`}
            >
              {plan.isPopular && (
                <div className="paws-popular-tag">
                  <Sparkles size={13} />
                  <span>LE PLUS PLÉBISCITÉ</span>
                </div>
              )}

              <div className="paws-pricing-card-head">
                <span className="paws-plan-target">{plan.target}</span>
                <h3 className="paws-plan-name">{plan.name}</h3>
                <div className="paws-plan-frequency">{plan.frequency}</div>
                
                <div className="paws-plan-price-wrap">
                  <span className="paws-plan-price">{plan.price}</span>
                  <span className="paws-plan-original">{plan.originalPrice}</span>
                  <span className="paws-plan-per">/ envoi</span>
                </div>
              </div>

              <ul className="paws-plan-features">
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <Check size={15} color="var(--color-brand-primary)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`btn btn-block ${plan.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleSubscribe(plan)}
              >
                <span>Choisir cette routine</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
