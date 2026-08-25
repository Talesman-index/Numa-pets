import React, { useState } from 'react';
import { ArrowRight, Sparkles, Filter, Check } from 'lucide-react';

export const RoutineFinderBanner = ({ onNavigate }) => {
  const [petType, setPetType] = useState('chien');
  const [need, setNeed] = useState('promenade');

  const handleSearch = (e) => {
    e.preventDefault();
    if (petType === 'chien') {
      onNavigate('chien', { category: need });
    } else {
      onNavigate('chat', { category: need });
    }
  };

  return (
    <section className="section paws-finder-section">
      <div className="container">
        
        <div className="paws-finder-card" style={{ backgroundColor: '#4E0000', color: '#FFFFFF', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255, 174, 1, 0.25)', boxShadow: 'var(--shadow-lg)' }}>
          {/* Left Media (Shiba with sunglasses) */}
          <div className="paws-finder-img-wrap" style={{ backgroundColor: '#FAF3E7', borderRadius: 'var(--radius-xl)' }}>
            <img
              src="/images/shiba-sunglasses-peeking.png"
              alt="Assistant de sélection MOKI"
              className="paws-finder-img"
            />
          </div>

          {/* Right Interactive Form */}
          <div className="paws-finder-content">
            <div className="carepaw-nl-tag" style={{ marginBottom: 'var(--space-3)' }}>
              <span>GUIDE SUR-MESURE MOKI</span>
              <Sparkles size={12} color="#FFAE01" />
            </div>

            <h2 className="paws-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
              Trouvez l'équipement idéal<br />
              <span style={{ color: '#FFAE01' }}>en moins de 30 secondes.</span>
            </h2>

            <p className="paws-section-lead" style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.78)', marginBottom: 'var(--space-6)' }}>
              Indiquez le profil de votre animal pour accéder instantanément aux indispensables adaptés à sa taille et son rythme de vie.
            </p>

            <form onSubmit={handleSearch} className="paws-finder-form">
              <div className="finder-form-row">
                <div className="finder-select-group">
                  <label style={{ color: '#FFAE01', fontWeight: 700 }}>Votre Compagnon</label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="paws-select"
                    style={{ backgroundColor: '#FFFFFF', color: '#4E0000', fontWeight: 700 }}
                  >
                    <option value="chien">Mon Chien</option>
                    <option value="chat">Mon Chat</option>
                  </select>
                </div>

                <div className="finder-select-group">
                  <label style={{ color: '#FFAE01', fontWeight: 700 }}>Besoin Principal</label>
                  <select
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="paws-select"
                    style={{ backgroundColor: '#FFFFFF', color: '#4E0000', fontWeight: 700 }}
                  >
                    {petType === 'chien' ? (
                      <>
                        <option value="promenade">Sortie & Promenade (Harnais, Laisses)</option>
                        <option value="hygiene">Hygiène & Soin (Shampoing, Coussinets)</option>
                        <option value="maison">Repos & Jeux (Paniers, Peluches)</option>
                      </>
                    ) : (
                      <>
                        <option value="hygiene">Hygiène & Pelage (Brosses, Lingettes)</option>
                        <option value="confort">Arbre à chat & Couchages</option>
                        <option value="jeu">Jouets & Éveil</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-4)', padding: '14px 28px' }}>
                <Sparkles size={16} />
                <span>Voir ma sélection personnalisée</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
