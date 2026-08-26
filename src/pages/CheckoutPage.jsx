import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  PackageCheck,
  RotateCcw
} from 'lucide-react';

export const CheckoutPage = ({ onNavigate }) => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedPromo,
    placeOrder,
    showToast,
    user
  } = useStore();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || 'sophie.martin@example.com',
    firstName: user?.firstName || 'Sophie',
    lastName: user?.lastName || 'Martin',
    phone: user?.phone || '06 12 34 56 78',
    address: user?.addresses?.[0]?.street || '14 Rue des Lilas',
    city: user?.addresses?.[0]?.city || 'Lyon',
    zip: user?.addresses?.[0]?.zip || '69003',
    country: 'France',
    shippingMethod: 'colissimo_domicile',
    paymentMethod: 'card',
    cardNumber: '4970 •••• •••• 8492',
    cardExp: '08/28',
    cardCvv: '482'
  });

  // Confirmed Order Result
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Shipping Methods calculation
  const isFreeEligible = cartSubtotal >= 49.0 || appliedPromo?.type === 'free_shipping';

  const shippingOptions = [
    {
      id: 'point_relais',
      name: 'Mondial Relay / Point Relais',
      delay: '48 à 72h ouvrées',
      price: isFreeEligible ? 0.0 : 3.90
    },
    {
      id: 'colissimo_domicile',
      name: 'Colissimo Domicile sans signature',
      delay: '48h ouvrées',
      price: isFreeEligible ? 0.0 : 5.90
    },
    {
      id: 'chronopost_express',
      name: 'Chronopost Express 24h',
      delay: 'Livraison demain avant 13h',
      price: 9.90
    }
  ];

  const selectedShippingOption = shippingOptions.find((o) => o.id === formData.shippingMethod) || shippingOptions[1];
  const shippingFee = selectedShippingOption.price;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextFromStep1 = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.lastName) {
      showToast('Veuillez remplir vos informations de contact', 'error');
      return;
    }
    setStep(2);
  };

  const handleNextFromStep2 = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.city || !formData.zip) {
      showToast('Veuillez remplir votre adresse complète de livraison', 'error');
      return;
    }
    setStep(3);
  };

  const handleFinalPayment = (e) => {
    e.preventDefault();
    const placed = placeOrder({
      ...formData,
      shippingMethod: selectedShippingOption.name,
      shippingFee
    });
    setConfirmedOrder(placed);
    setStep(4);
    showToast('Commande validée avec succès !', 'success');
  };

  // If cart empty and not in confirmation step
  if (cart.length === 0 && step !== 4) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Votre panier est vide</h2>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('nos-essentiels')}>
            Explorer le catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Tunnel de commande' }]} onNavigate={onNavigate} />

        {/* Step Tracker Header */}
        <div className="step-tracker">
          <div className={`step-item ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <span className="step-num">{step > 1 ? '✓' : '1'}</span>
            <span className="step-label">Informations</span>
          </div>
          <div className={`step-connector ${step > 1 ? 'completed' : ''}`} />
          <div className={`step-item ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <span className="step-num">{step > 2 ? '✓' : '2'}</span>
            <span className="step-label">Livraison</span>
          </div>
          <div className={`step-connector ${step > 2 ? 'completed' : ''}`} />
          <div className={`step-item ${step === 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
            <span className="step-num">{step > 3 ? '✓' : '3'}</span>
            <span className="step-label">Paiement</span>
          </div>
          <div className={`step-connector ${step >= 4 ? 'completed' : ''}`} />
          <div className={`step-item ${step === 4 ? 'active completed' : ''}`}>
            <span className="step-num">{step === 4 ? '✓' : '4'}</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {/* Step 4 : Order Confirmation Screen */}
        {step === 4 && confirmedOrder ? (
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-12) var(--space-8)', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', backgroundColor: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', color: '#059669' }}>
              <CheckCircle2 size={36} />
            </div>

            <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-brand-primary)', marginBottom: 'var(--space-2)' }}>
              Merci ! Votre commande est confirmée.
            </h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Un email de confirmation contenant votre facture a été envoyé à <strong>{confirmedOrder.customer.email}</strong>.
            </p>

            {/* Order details Card */}
            <div style={{ backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', textAlign: 'left', marginBottom: 'var(--space-8)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Numéro de commande</div>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800 }}>{confirmedOrder.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Date & Statut</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{confirmedOrder.date} — {confirmedOrder.status}</div>
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Adresse de livraison</div>
                <div style={{ fontSize: 'var(--text-sm)' }}>
                  {confirmedOrder.customer.firstName} {confirmedOrder.customer.lastName}<br />
                  {confirmedOrder.customer.address}<br />
                  {confirmedOrder.customer.zip} {confirmedOrder.customer.city}, {confirmedOrder.customer.country}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                <span>Total réglé</span>
                <span>{confirmedOrder.total.toFixed(2)} €</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('suivi-commande', { trackingId: confirmedOrder.id })}
              >
                <Truck size={16} />
                <span>Suivre l’acheminement en direct</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('compte')}
              >
                Accéder à mon espace client
              </button>
            </div>
          </div>
        ) : (
          /* Steps 1 to 3 Layout */
          <div className="checkout-layout">
            {/* Left Column: Form according to step */}
            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)' }}>
              {/* STEP 1 : Informations */}
              {step === 1 && (
                <form onSubmit={handleNextFromStep1}>
                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                    1. Vos coordonnées
                  </h2>

                  <div className="form-group">
                    <label className="form-label">Adresse email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Téléphone (pour le transporteur)</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 'var(--space-6)' }}>
                    <span>Continuer vers la livraison</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* STEP 2 : Livraison */}
              {step === 2 && (
                <form onSubmit={handleNextFromStep2}>
                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                    2. Adresse et mode de livraison
                  </h2>

                  <div className="form-group">
                    <label className="form-label">Adresse postale</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Numéro et nom de rue"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-row-3">
                    <div className="form-group">
                      <label className="form-label">Ville</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Code postal</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pays</label>
                      <select
                        className="form-input"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Suisse">Suisse</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
                    <div className="form-label">Mode d’expédition</div>
                    <div className="shipping-options-grid">
                      {shippingOptions.map((opt) => (
                        <div
                          key={opt.id}
                          className={`shipping-option-card ${formData.shippingMethod === opt.id ? 'selected' : ''}`}
                          onClick={() => handleInputChange('shippingMethod', opt.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <input
                              type="radio"
                              checked={formData.shippingMethod === opt.id}
                              onChange={() => handleInputChange('shippingMethod', opt.id)}
                            />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{opt.name}</div>
                              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{opt.delay}</div>
                            </div>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: opt.price === 0 ? 'var(--color-accent-emerald)' : 'inherit' }}>
                            {opt.price === 0 ? 'Gratuit' : `${opt.price.toFixed(2)} €`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} />
                      <span>Retour</span>
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                      <span>Continuer vers le paiement</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3 : Paiement */}
              {step === 3 && (
                <form onSubmit={handleFinalPayment}>
                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                    3. Paiement sécurisé
                  </h2>

                  {/* Payment Method Selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                    <button
                      type="button"
                      className={`btn ${formData.paymentMethod === 'card' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      style={{ padding: 'var(--space-3)' }}
                    >
                      <CreditCard size={16} />
                      <span>Carte bancaire</span>
                    </button>

                    <button
                      type="button"
                      className={`btn ${formData.paymentMethod === 'apple' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleInputChange('paymentMethod', 'apple')}
                      style={{ padding: 'var(--space-3)' }}
                    >
                      <span> Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      className={`btn ${formData.paymentMethod === 'paypal' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => handleInputChange('paymentMethod', 'paypal')}
                      style={{ padding: 'var(--space-3)' }}
                    >
                      <span>PayPal</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div style={{ backgroundColor: 'var(--color-surface-subtle)', padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)' }}>
                      <div className="form-group">
                        <label className="form-label">Numéro de carte bancaire</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">Expiration (MM/AA)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={formData.cardExp}
                            onChange={(e) => handleInputChange('cardExp', e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Code de sécurité (CVV)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange('cardCvv', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                    <Lock size={14} color="#059669" />
                    <span>Protocole SSL 256 bits chiffré. Aucun détail bancaire n’est conservé.</span>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft size={16} />
                      <span>Retour</span>
                    </button>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ flexGrow: 1 }}>
                      <Lock size={16} />
                      <span>Payer {finalTotal.toFixed(2)} €</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Order Recap */}
            <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', position: 'sticky', top: 96 }}>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                Articles commandés ({cart.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxHeight: 280, overflowY: 'auto', marginBottom: 'var(--space-4)' }}>
                {cart.map((item) => {
                  const itemKey = item.cartItemId || item.cartId || item.id;
                  const itemTitle = item.title || item.product?.title || 'Produit NÜMA';
                  const itemImg = item.image || item.product?.images?.[0] || item.product?.image || '/images/hero-golden-duo.jpg';
                  const itemPrice = typeof item.price === 'number' ? item.price : (typeof item.unitPrice === 'number' ? item.unitPrice : (item.product?.price || 0));
                  const itemVariant = item.variantKey || (item.selectedVariants ? Object.values(item.selectedVariants).filter(Boolean).join(' · ') : '');

                  return (
                    <div key={itemKey} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <img src={itemImg} alt={itemTitle} style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontWeight: 600 }}>{itemTitle} (x{item.quantity})</div>
                          <div style={{ color: 'var(--color-text-muted)' }}>{itemVariant}</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 700 }}>{(itemPrice * item.quantity).toFixed(2)} €</div>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Sous-total</span>
                  <span>{cartSubtotal.toFixed(2)} €</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-accent-emerald)' }}>
                    <span>Remise promo</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Livraison ({selectedShippingOption.name.split(' ')[0]})</span>
                  <span>{shippingFee === 0 ? 'Gratuit' : `${shippingFee.toFixed(2)} €`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-base)', fontWeight: 800, borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                  <span>Total à payer</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
