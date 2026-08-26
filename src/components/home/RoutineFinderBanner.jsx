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
          {/* Left Media (Dog & Cat Duo) */}
          <div className="paws-finder-img-wrap" style={{ backgroundColor: '#FAF3E7', borderRadius: 'var(--radius-xl)', overflow: 'hidden', padding: 0 }}>
            <img
              src="/images/routine-finder-pets.jpg"
              alt="Assistant de sélection NÜMA pour chiens et chats"
              className="paws-finder-img"
            />
          </div>

          {/* Right Interactive Form */}
          <div className="paws-finder-content">
            <div className="carepaw-nl-tag" style={{ marginBottom: 'var(--space-3)' }}>
              <span>FILTRE GUIDÉ NÜMA</span>
            </div>

            <h2 className="paws-section-title" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
              Trouvez l'équipement idéal<br />
              <span style={{ color: '#FFAE01' }}>en moins de 30 secondes.</span>
            </h2>

            <p className="paws-section-lead" style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.78)', marginBottom: 'var(--space-6)' }}>
              Sélectionnez votre compagnon et votre besoin pour accéder directement aux essentiels adaptés.
            </p>

            <form onSubmit={handleSearch} className="paws-finder-form">
              <div className="finder-form-row">
                <div className="finder-select-group">
                  <label style={{ color: '#FFAE01', fontWeight: 700 }}>1. Pour qui recherchez-vous un produit ?</label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="paws-select"
                    style={{ backgroundColor: '#FFFFFF', color: '#4E0000', fontWeight: 700 }}
                  >
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                  </select>
                </div>

                <div className="finder-select-group">
                  <label style={{ color: '#FFAE01', fontWeight: 700 }}>2. Quel est votre besoin ?</label>
                  <select
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="paws-select"
                    style={{ backgroundColor: '#FFFFFF', color: '#4E0000', fontWeight: 700 }}
                  >
                    <option value="care">Soin &amp; Hygiène</option>
                    <option value="walk">Promenade</option>
                    <option value="play">Jeu</option>
                    <option value="comfort">Confort</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 'var(--space-4)', padding: '14px 28px' }}>
                <Sparkles size={16} />
                <span>Voir ma sélection</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
