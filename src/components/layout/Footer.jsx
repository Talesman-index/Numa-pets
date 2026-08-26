import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUpRight, Check, PawPrint, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Veuillez saisir une adresse email valide.', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Bienvenue dans le Club MOKI ! -10% offerts.', 'success');
  };

  return (
    <footer className="carepaw-footer">
      <div className="container">
        
        {/* 1. TOP NEWSLETTER STRIP */}
        <div className="carepaw-nl-row">
          <div className="carepaw-nl-left">
            <div className="carepaw-nl-tag">
              <span>S'INSCRIRE ET ÉCONOMISER</span>
            </div>
            <h2 className="carepaw-nl-title">Rejoignez notre Newsletter !</h2>
            <p className="carepaw-nl-sub">
              Recevez nos conseils vétérinaires, nouveautés & offres exclusives
            </p>
          </div>

          <div className="carepaw-nl-right">
            {isSubscribed ? (
              <div className="carepaw-nl-success-pill">
                <Check size={18} color="#10B981" />
                <span>Merci ! Votre bon de réduction de -10% vous attend dans votre boîte mail.</span>
              </div>
            ) : (
              <form className="carepaw-nl-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="carepaw-nl-input"
                  required
                />
                <button type="submit" className="carepaw-nl-btn">
                  <span>S'inscrire</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. SUBTLE SEPARATOR */}
        <div className="carepaw-dashed-divider" />

        {/* 3. MAIN 4-COLUMN FOOTER */}
        <div className="carepaw-main-grid">
          
          {/* Col 1 : Brand & Bio */}
          <div className="carepaw-col-brand">
            <div className="carepaw-logo" onClick={() => onNavigate && onNavigate('accueil')} style={{ cursor: 'pointer' }}>
              <div className="carepaw-logo-paw">
                <PawPrint size={24} fill="#FFAE01" color="#FFAE01" />
              </div>
              <span className="carepaw-logo-text">MOKI</span>
            </div>
            <p className="carepaw-brand-bio">
              Chez MOKI, nous concevons une sélection courte de 15 à 20 indispensables (équipements, accessoires et soins d'hygiène) pour garder vos animaux sains, heureux et aimés comme des membres de la famille.
            </p>
          </div>

          {/* Col 2 : Quick Links */}
          <div className="carepaw-col-links">
            <h3 className="carepaw-col-title">Liens Rapides</h3>
            <ul className="carepaw-nav-list">
              <li><button type="button" onClick={() => onNavigate && onNavigate('a-propos')}>À propos</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('nos-essentiels')}>Nos Essentiels</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('conseils')}>Le Journal & Conseils</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('nos-essentiels')}>Abonnements & Tarifs</button></li>
              <li><button type="button" onClick={() => onNavigate && onNavigate('faq')}>FAQ & Aide</button></li>
            </ul>
          </div>

          {/* Col 3 : Contact */}
          <div className="carepaw-col-contact">
            <h3 className="carepaw-col-title">Contact</h3>
            <div className="carepaw-contact-list">
              <a href="tel:+33189714200" className="carepaw-contact-row">
                <div className="carepaw-contact-icon-box">
                  <Phone size={16} />
                </div>
                <div className="carepaw-contact-text">
                  <span className="contact-label">Téléphone</span>
                  <strong className="contact-value">+33 1 89 71 42 00</strong>
                </div>
              </a>

              <a href="mailto:contact@moki-pets.fr" className="carepaw-contact-row">
                <div className="carepaw-contact-icon-box">
                  <Mail size={16} />
                </div>
                <div className="carepaw-contact-text">
                  <span className="contact-label">Email</span>
                  <strong className="contact-value">contact@moki-pets.fr</strong>
                </div>
              </a>

              <div className="carepaw-contact-row">
                <div className="carepaw-contact-icon-box">
                  <MapPin size={16} />
                </div>
                <div className="carepaw-contact-text">
                  <span className="contact-label">Localisation</span>
                  <strong className="contact-value">Lyon & Paris, France</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4 : Our Social Link */}
          <div className="carepaw-col-social">
            <h3 className="carepaw-col-title">Nos Réseaux</h3>
            <div className="carepaw-social-buttons">
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="carepaw-social-btn" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="carepaw-social-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="carepaw-social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Cat Paw / Community icon */}
              <a href="#/a-propos" className="carepaw-social-btn" aria-label="Club MOKI">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 4c-2.76 0-5 2.24-5 5 0 2.45 1.76 4.47 4.08 4.91L12 22l1.92-2.09C16.24 19.47 18 17.45 18 15c0-2.76-2.24-5-5-5z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* 4. BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="carepaw-bottom-bar">
          <div className="carepaw-copyright">
            © Copyright {new Date().getFullYear()}, Tous droits réservés par <strong>MOKI Pets France</strong>
          </div>
          <div className="carepaw-legal-links">
            <button type="button" onClick={() => onNavigate && onNavigate('a-propos')}>Politique de Confidentialité</button>
            <span className="legal-divider">|</span>
            <button type="button" onClick={() => onNavigate && onNavigate('a-propos')}>Conditions Générales de Vente</button>
            <span className="legal-divider">|</span>
            <button type="button" onClick={() => onNavigate && onNavigate('a-propos')}>Mentions Légales</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
