import React from 'react';
import { Check, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';

export const BondStorySection = ({ onNavigate }) => {
  return (
    <section className="section paws-story-section">
      <div className="container">
        <div className="paws-story-grid">
          
          {/* Left Media Column with Cutout & Decorative Badges */}
          <div className="paws-story-media-wrap">
            <div className="paws-story-shape-bg">
              <img
                src="/images/hero-vet-dog.jpg"
                alt="Expertise et bienveillance MOKI"
                className="paws-story-img"
              />
            </div>

            {/* Floating Reassurance Tag */}
            <div className="paws-story-floating-tag">
              <div className="floating-tag-icon">
                <Sparkles size={16} />
              </div>
              <div className="floating-tag-content">
                <span className="floating-tag-title">Formulé avec Soin</span>
                <span className="floating-tag-sub">Approuvé par des vétérinaires</span>
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
              Nous avons fait le choix radical d’un catalogue resserré de 15 à 20 essentiels. Ni alimentation, ni médicaments : uniquement des accessoires ergonomiques et des soins d'hygiène sains, conçus pour durer.
            </p>

            <div className="paws-story-checklist">
              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Sélection 100% Utile</strong>
                  <p>Fini les dizaines de gadgets inutiles. Chaque produit répond à un besoin vital du quotidien.</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Formules Douces & Testées</strong>
                  <p>Shampoings, lingettes et baumes sans alcool, sans parabènes, respectant le pH cutané.</p>
                </div>
              </div>

              <div className="paws-check-item">
                <div className="paws-check-icon">
                  <Check size={14} />
                </div>
                <div>
                  <strong>Vente Directe sans Intermédiaire</strong>
                  <p>Le meilleur rapport qualité/prix garanti par un circuit court depuis nos ateliers partenaires.</p>
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
