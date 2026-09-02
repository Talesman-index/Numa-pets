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
              Ce que NÜMA vous propose :<br />
              <span style={{ color: 'var(--color-brand-primary)' }}>moins de superflu, infiniment plus d'attention.</span>
            </h2>

            <p className="paws-section-lead">
              NÜMA vous propose une sélection resserrée de 18 essentiels où chaque création a une raison d'être. Ni alimentation, ni médicaments : uniquement des accessoires ergonomiques, des équipements durables et des soins d'hygiène d'une douceur absolue.
            </p>

            <div className="paws-story-checklist">
              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>NÜMA vous propose une ergonomie pensée pour leur corps</strong>
                  <p>Harnais en Y libérant la trachée, laisses amortissantes et couchages à mémoire de forme qui soulagent les articulations.</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>NÜMA vous propose des formules saines &amp; respectueuses</strong>
                  <p>Shampoings, mousses sans rinçage et baumes coussinets sans alcool ni parabènes, au pH strictement physiologique.</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>NÜMA vous propose la transparence et le juste prix</strong>
                  <p>Un modèle direct sans intermédiaire pour vous garantir une qualité irréprochable et un stock expédié depuis la France.</p>
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
