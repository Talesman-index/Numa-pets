import React from 'react';
import { Check, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const BondStorySection = ({ onNavigate }) => {
  return (
    <section id="histoire-section" className="section paws-story-section">
      <div className="container">
        <div className="paws-story-grid">
          
          {/* Left Media Column with Cutout & Decorative Badges */}
          <div className="paws-story-media-wrap">
            <div className="paws-story-shape-bg">
              <img
                src="/images/hero-vet-dog.jpg"
                alt="Expertise et bienveillance NÜMA"
                className="paws-story-img"
              />
            </div>

            {/* Floating Reassurance Tag */}
            <div className="paws-story-floating-tag">
              <div className="floating-tag-icon">
                <Sparkles size={16} />
              </div>
              <div className="floating-tag-content">
                <span className="floating-tag-title">Sélection Maîtrisée</span>
                <span className="floating-tag-sub">Pensée pour leur bien-être</span>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="paws-story-content">
            <div className="paws-section-badge">
              <span>NOTRE PHILOSOPHIE</span>
            </div>

            <h2 className="paws-section-title">
              Moins de produits,<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>infiniment plus d'attention.</span>
            </h2>

            <p className="paws-section-lead">
              Nous avons fait le choix d’une sélection volontairement courte de 18 essentiels. Ni alimentation, ni médicaments : uniquement des accessoires ergonomiques, des équipements pratiques et des soins d'hygiène doux.
            </p>

            <div className="paws-story-checklist">
              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Sélection 100% Utile</strong>
                  <p>Pas de superflu. Chaque produit répond à un usage concret du quotidien (promenade, soin, jeu, repos).</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Formules Saines &amp; Respectueuses</strong>
                  <p>Shampoings, lingettes et baumes sans alcool, sans parabènes, respectant le pH physiologique de l'animal.</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Vente Directe &amp; Transparence</strong>
                  <p>Un modèle sans intermédiaire pour proposer une offre claire et accessible.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-8)' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => onNavigate('a-propos')}
              >
                <span>Découvrir notre histoire</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
