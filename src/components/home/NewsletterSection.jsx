import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      addToast('Bienvenue dans la famille NÜMA ! Code NUMA10 activé.');
      setEmail('');
    }
  };

  return (
    <section className="section paws-newsletter-section">
      <div className="container">
        
        <div className="paws-newsletter-card">
          <div className="paws-newsletter-left">
            <div className="paws-section-badge" style={{ backgroundColor: 'rgba(255, 107, 0, 0.2)', color: '#FF6B00' }}>
              <span>OFFRE DE BIENVENUE</span>
            </div>

            <h2 className="paws-newsletter-title">
              Rejoignez le Club NÜMA et<br />
              profitez de <span style={{ color: '#FF6B00' }}>10% offerts</span> sur votre première commande.
            </h2>

            <p className="paws-newsletter-desc">
              Recevez nos conseils de vétérinaires, nos lancements de produits exclusifs et nos offres privées. Aucun spam, désinscription en 1 clic.
            </p>
          </div>

          <div className="paws-newsletter-right">
            {subscribed ? (
              <div className="paws-newsletter-success">
                <CheckCircle size={24} color="#10B981" />
                <div>
                  <strong>Merci pour votre inscription !</strong>
                  <p>Votre code <strong>NUMA10</strong> a été envoyé par email.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="paws-newsletter-form">
                <input
                  type="email"
                  placeholder="Votre adresse email (ex: marie@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="paws-newsletter-input"
                />
                <button type="submit" className="paws-newsletter-btn">
                  <span>S'inscrire</span>
                  <Send size={15} />
                </button>
              </form>
            )}
            <span className="paws-newsletter-terms">En vous inscrivant, vous acceptez notre politique de confidentialité.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
