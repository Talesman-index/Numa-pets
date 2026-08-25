import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FAQ_DATA } from '../data/faqData';
import { ChevronDown, ChevronUp, Search, Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FaqPage = ({ onNavigate }) => {
  const { addToast } = useStore();
  const [selectedCat, setSelectedCat] = useState('all');
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Question sur un produit', message: '' });

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      addToast('Veuillez remplir tous les champs du formulaire', 'error');
      return;
    }
    setContactSubmitted(true);
    addToast('Votre message a bien été transmis à l’équipe MOKI', 'success');
  };

  const filteredCategories = FAQ_DATA.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const q = searchTerm.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    });
    return { ...cat, items: matchingItems };
  }).filter((cat) => (selectedCat === 'all' || cat.category === selectedCat) && cat.items.length > 0);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)', backgroundColor: '#FAF6ED' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <Breadcrumbs items={[{ label: 'Centre d’aide & FAQ' }]} onNavigate={onNavigate} />

        {/* Hero Aide */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)', backgroundColor: '#4E0000', border: '1px solid rgba(255,174,1,0.25)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', boxShadow: 'var(--shadow-md)', color: '#FFFFFF' }}>
          <div className="carepaw-nl-tag" style={{ margin: '0 auto var(--space-3)' }}>
            <Sparkles size={13} color="#FFAE01" />
            <span>Support & Assistance Client</span>
          </div>
          <h1 className="paws-section-title" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Questions Fréquentes
          </h1>
          <p className="paws-section-lead" style={{ margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)' }}>
            Retrouvez rapidement toutes les réponses sur nos produits, la livraison 24h, les retours 30 jours et les abonnements libres.
          </p>
        </div>

        {/* Search in FAQ */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-8)' }}>
          <Search size={18} color="#FF6B00" style={{ position: 'absolute', left: 18, top: 16 }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 50, height: 50, fontSize: 'var(--text-sm)', borderRadius: 'var(--radius-full)', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', boxShadow: 'var(--shadow-sm)' }}
            placeholder="Rechercher une question (ex: délais, retour, résiliation, tailles...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-8)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn ${selectedCat === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setSelectedCat('all')}
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
          >
            Toutes les questions
          </button>
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.category}
              type="button"
              className={`btn ${selectedCat === cat.category ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setSelectedCat(cat.category)}
              style={{ borderRadius: 'var(--radius-full)', padding: '8px 18px' }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginBottom: 'var(--space-16)' }}>
          {filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-10)', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(0,0,0,0.06)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>Aucune question trouvée pour « {searchTerm} ».</p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.category}>
                <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.4rem', marginBottom: 'var(--space-3)', color: '#141414' }}>
                  {cat.category}
                </h2>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                  {cat.items.map((item, idx) => {
                    const key = `${cat.category}-${idx}`;
                    const isOpen = openItems[key] || false;
                    return (
                      <div key={idx} style={{ borderBottom: idx < cat.items.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
                        <button
                          type="button"
                          onClick={() => toggleItem(key)}
                          style={{ width: '100%', padding: 'var(--space-5) var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', fontWeight: 700, fontSize: 'var(--text-base)', color: '#141414' }}
                        >
                          <span>{item.q}</span>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: isOpen ? '#FF6B00' : 'rgba(0,0,0,0.05)', color: isOpen ? '#FFFFFF' : '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 12 }}>
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 var(--space-6) var(--space-5)', fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Form Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
            <Mail size={22} color="#FF6B00" />
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.6rem', color: '#141414' }}>Vous avez une autre question ?</h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            Notre équipe support basée en France vous répond en moins de 24h ouvrées du lundi au vendredi.
          </p>

          {contactSubmitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: 'var(--radius-lg)', color: '#047857' }}>
              <CheckCircle2 size={20} />
              <div>
                <strong>Message transmis avec succès !</strong> Nous vous répondrons très vite à l’adresse {contactForm.email}.
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Votre nom</label>
                  <input
                    type="text"
                    className="form-input"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Votre adresse email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Objet de la demande</label>
                <select
                  className="form-input"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                >
                  <option value="Question sur un produit">Question sur un produit / guide des tailles</option>
                  <option value="Suivi de commande">Suivi ou modification de commande</option>
                  <option value="Retour ou échange">Retour ou échange 30 jours</option>
                  <option value="Abonnement">Gestion de mon abonnement libre</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Votre message</label>
                <textarea
                  className="form-input"
                  rows="4"
                  placeholder="Expliquez-nous votre besoin en précisant votre numéro de commande si applicable..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '12px 28px' }}>
                <Send size={16} />
                <span>Envoyer ma question</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
