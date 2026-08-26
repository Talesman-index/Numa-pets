import React from 'react';
import { ArrowUpRight, PawPrint, Leaf } from 'lucide-react';
import { ScrollDownIndicator } from '../common/ScrollDownIndicator';

export const HeroSection = ({ onNavigate }) => {
  return (
    <section className="paws-hero-section" style={{ position: 'relative' }}>
      <div className="container paws-hero-container">

        {/* 1. Titre Géant */}
        <div className="paws-hero-headline-wrap reveal-up">
          <h1 className="paws-hero-title">
            <span className="paws-title-dark">Le Confort &amp; le Soin</span>
            <span className="paws-title-orange">Pensés Pour Chiens &amp; Chats</span>
          </h1>
        </div>

        {/* 2. Scène Dynamique du Hero */}
        <div className="paws-hero-stage">

          {/* Colonne Gauche */}
          <div className="paws-hero-left stagger-children">
            {/* Macaron Solaire */}
            <div className="paws-sunburst-badge">
              <svg viewBox="0 0 100 100" className="sunburst-svg">
                <path
                  d="M50 0 L58 14 L74 6 L76 23 L93 23 L87 39 L100 48 L89 60 L98 74 L82 80 L84 97 L68 93 L62 100 L50 89 L38 100 L32 93 L16 97 L18 80 L2 74 L11 60 L0 48 L13 39 L7 23 L24 23 L26 6 L42 14 Z"
                  fill="#FFAE01"
                />
              </svg>
              <div className="sunburst-paw-inner">
                <PawPrint size={28} fill="#4E0000" color="#4E0000" />
              </div>
            </div>

            <h2 className="paws-left-title">
              Sélection Courte,<br />Qualité Durable.
            </h2>

            <p className="paws-left-desc">
              Équipements, accessoires et soins essentiels. Conçus avec soin, vendus en direct pour le bien-être de vos animaux.
            </p>

            <button
              type="button"
              className="paws-btn-shop-now"
              onClick={() => onNavigate('nos-essentiels')}
            >
              <span>Découvrir la gamme</span>
              <div className="paws-btn-arrow-circle">
                <ArrowUpRight size={14} />
              </div>
            </button>
          </div>

          {/* Colonne Centrale : Image */}
          <div className="paws-hero-center reveal-scale">
            <div className="paws-center-composition">
              <img
                src="/images/hero-woman-dog.png"
                alt="MOKI - Confort et soin pour chiens et chats"
                className="paws-center-visual"
              />
            </div>
          </div>

          {/* Colonne Droite : Packs */}
          <div className="paws-hero-right reveal-right">
            <div
              className="paws-hero-packs-wrap"
              onClick={() => onNavigate('nos-essentiels')}
              role="button"
              tabIndex={0}
              title="Découvrir nos gammes et formules"
            >
              <div className="paws-hero-packs-badge">
                <Leaf size={14} color="#047857" />
                <span>Formules 100% Saines</span>
              </div>
              <img
                src="/images/product-packs-trio.png"
                alt="Packs et emballages de produits MOKI"
                className="paws-hero-packs-img"
              />
              <div className="paws-hero-packs-caption">
                <strong>Nos Gammes &amp; Packs Essentiels</strong>
                <span>-10% en livraison récurrente libre</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll-Down Indicator */}
      <ScrollDownIndicator />
    </section>
  );
};
