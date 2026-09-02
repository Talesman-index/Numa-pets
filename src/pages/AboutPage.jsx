import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Layers, ShieldCheck, CheckCircle2, Truck, Eye, Sparkles, Heart } from 'lucide-react';

export const AboutPage = ({ onNavigate }) => {
  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container" style={{ maxWidth: 920 }}>
        <Breadcrumbs items={[{ label: 'À propos de NÜMA' }]} onNavigate={onNavigate} />

        {/* Hero Section Manifeste */}
        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'var(--space-12)', backgroundColor: '#4E0000', border: '1px solid rgba(255,174,1,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', boxShadow: 'var(--shadow-md)', color: '#FFFFFF' }}>
          <div className="carepaw-nl-tag" style={{ margin: '0 auto var(--space-3)' }}>
            <span>NOTRE PHILOSOPHIE</span>
          </div>
          <h1 className="paws-section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Ce que NÜMA vous propose :<br />l'essentiel, pensé avec amour.
          </h1>
          <p className="paws-section-lead" style={{ margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)' }}>
            Une sélection courte de 18 indispensables (équipements ergonomiques, soins doux au pH neutre et accessoires durables) créés pour sublimer la vraie vie de vos chiens et chats.
          </p>
        </div>

        {/* Section 1: Notre Histoire & Constat */}
        <div className="reveal-left" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', marginBottom: 'var(--space-8)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.8rem', color: '#141414', marginBottom: 'var(--space-4)' }}>
            Pourquoi NÜMA existe ?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
            L’animalerie traditionnelle regorge de milliers de références souvent superflues, d’accessoires fragiles et de formules de soin complexes dont on ignore la réelle composition.
          </p>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <strong>NÜMA est née d’une promesse claire :</strong> simplifier radicalement la vie des maîtres en se concentrant sur un catalogue resserré de 18 essentiels ultra-qualitatifs. Nous ne vendons <strong>ni alimentation industrielle ni médicaments</strong>, uniquement ce qui compte pour la promenade sereine, l’hygiène douce, le jeu bienveillant et le confort de repos.
          </p>
        </div>

        {/* Section Rituels : Ce que NÜMA vous propose au quotidien */}
        <div className="reveal-up" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', marginBottom: 'var(--space-8)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.8rem', color: '#141414', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            Ce que NÜMA vous propose au quotidien
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-6)' }}>
            <div style={{ padding: 'var(--space-6)', backgroundColor: '#FAF6ED', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>🐕</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#141414', marginBottom: '8px' }}>Pour la Promenade</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                NÜMA vous propose des harnais en Y préservant la trachée et des laisses polyvalentes pour transformer chaque sortie en pur moment de complicité.
              </p>
            </div>

            <div style={{ padding: 'var(--space-6)', backgroundColor: '#FAF6ED', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>🛁</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#141414', marginBottom: '8px' }}>Pour le Soin & l'Hygiène</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                NÜMA vous propose des formules clean sans alcool ni parabènes, au pH physiologique, respectant leur odorat sensible et leur barrière cutanée.
              </p>
            </div>

            <div style={{ padding: 'var(--space-6)', backgroundColor: '#FAF6ED', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>🛋️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#141414', marginBottom: '8px' }}>Pour le Repos & le Confort</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                NÜMA vous propose un soutien orthopédique à mémoire de forme pour soulager les tensions et offrir un sommeil réparateur digne de ce nom.
              </p>
            </div>

            <div style={{ padding: 'var(--space-6)', backgroundColor: '#FAF6ED', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 'var(--space-2)' }}>🎾</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#141414', marginBottom: '8px' }}>Pour l'Éveil & le Jeu</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                NÜMA vous propose des jouets durables et stimulants pour éveiller leur instinct naturel et apaiser l’anxiété par le jeu réfléchi.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Nos 5 Engagements Clairs */}
        <div className="reveal-up" style={{ marginBottom: 'var(--space-12)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '2.2rem', textAlign: 'center', color: '#141414', marginBottom: 'var(--space-8)' }}>
            Nos 5 Engagements Concrets
          </h2>

          <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 107, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Layers size={24} color="#FF6B00" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>1. Sélection courte et exigeante</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Chaque référence répond à un besoin d'usage précis. Si un produit n'apporte pas un confort mesurable ou une simplification concrète, il ne figure pas dans notre sélection.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 107, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={24} color="#FF6B00" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>2. Sécurité et conception anatomique</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Nos harnais respectent la biomécanique articulaire, nos formules de soin sont au pH neutre physiologique et nos jouets sont testés pour résister à une utilisation quotidienne.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 107, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CheckCircle2 size={24} color="#FF6B00" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>3. Conformité réglementaire stricte</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Tous nos produits répondent aux normes européennes d'hygiène et de sécurité applicables aux animaux de compagnie.
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 107, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Eye size={24} color="#FF6B00" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>4. Transparence totale des formules</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Nous détaillons l’intégralité des ingrédients cosmétiques et des matériaux employés (silicone alimentaire, acier inox, bois certifié, mousse orthopédique).
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-5)', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 107, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Truck size={24} color="#FF6B00" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#121212', marginBottom: '4px' }}>5. Expédition directe depuis la France</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Notre stock physique est hébergé en France pour vous garantir une préparation sous 24h et une livraison rapide sans intermédiaire.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => onNavigate('nos-essentiels')}
            style={{ borderRadius: 'var(--radius-full)', padding: '16px 36px', fontSize: '1rem' }}
          >
            Découvrir notre sélection
          </button>
        </div>
      </div>
    </div>
  );
};
