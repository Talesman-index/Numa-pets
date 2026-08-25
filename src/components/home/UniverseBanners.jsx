import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const UniverseBanners = ({ onNavigate }) => {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto var(--space-10)' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
            Deux mondes, une même exigence
          </span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginTop: 'var(--space-1)', letterSpacing: '-0.02em' }}>
            Choisissez votre univers
          </h2>
        </div>

        <div className="universe-bento-grid">
          {/* Card Chien */}
          <div className="universe-bento-card">
            <div className="universe-bento-img-wrap" style={{ backgroundColor: '#FDF8F3' }}>
              <img
                src="/images/pets-looking-up.png"
                alt="Chiot et chaton complices"
                className="universe-bento-img"
                style={{ objectPosition: 'center top', maxHeight: 320 }}
              />
              <span className="badge badge-dog" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                Univers Canin
              </span>
            </div>

            <div className="universe-bento-body">
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                Pour votre chien
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                Harnais ergonomiques sans traction, laisses polyvalentes, baumes réparateurs et couchages orthopédiques.
              </p>
              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNavigate('chien')}
                >
                  <span>Explorer pour Chien</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Card Chat */}
          <div className="universe-bento-card">
            <div className="universe-bento-img-wrap" style={{ backgroundColor: '#F5F3FF' }}>
              <img
                src="/images/cat-dog-duo.png"
                alt="Chat Bengal et Border Collie"
                className="universe-bento-img"
                style={{ objectPosition: 'center top', maxHeight: 320 }}
              />
              <span className="badge badge-cat" style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                Univers Félin
              </span>
            </div>

            <div className="universe-bento-body">
              <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                Pour votre chat
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                Mousses de toilettage sans eau, brosses électrostatiques douces, cannes à plumes et dômes cocon feutrés.
              </p>
              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNavigate('chat')}
                >
                  <span>Explorer pour Chat</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
