import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { ProductCard } from '../components/common/ProductCard';
import { Trash2, ArrowRight, ShoppingBag, CheckCircle2, Tag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const CartPage = ({ onNavigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    remainingForFreeShipping,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    updateCartQuantity,
    removeFromCart,
    products
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  // 3 Cross-sell recommendations
  const crossSells = products
    .filter((p) => !cart.some((item) => item.product.id === p.id))
    .slice(0, 3);

  const estimatedTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Mon panier' }]} onNavigate={onNavigate} />

        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-8)' }}>
          Votre panier ({cartCount} article{cartCount > 1 ? 's' : ''})
        </h1>

        {cart.length === 0 ? (
          <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-16) var(--space-8)', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
            <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
              <ShoppingBag size={32} color="var(--color-text-muted)" />
            </div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
              Votre panier est actuellement vide
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
              Explorez nos collections pour chien et chat afin d’ajouter vos premiers essentiels.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onNavigate('chien')}
              >
                Découvrir pour Chien
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onNavigate('chat')}
              >
                Découvrir pour Chat
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-10)', alignItems: 'flex-start' }}>
            {/* Left Column: Items List & Free shipping Bar */}
            <div>
              {/* Shipping Progress bar */}
              <div className="shipping-progress-box" style={{ marginBottom: 'var(--space-6)' }}>
                <div className="shipping-progress-text">
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Plus que <strong>{remainingForFreeShipping.toFixed(2)} €</strong> pour bénéficier de la <strong>livraison offerte</strong> !
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} /> <strong>Félicitations ! Votre livraison est offerte en France métropolitaine.</strong>
                    </span>
                  )}
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              {/* Items Card */}
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {cart.map((item) => {
                    const itemKey = item.cartItemId || item.cartId || item.id;
                    const itemTitle = item.title || item.product?.title || 'Produit NÜMA';
                    const itemImg = item.image || item.product?.images?.[0] || item.product?.image || '/images/hero-golden-duo.jpg';
                    const itemPrice = typeof item.price === 'number' ? item.price : (typeof item.unitPrice === 'number' ? item.unitPrice : (item.product?.price || 0));
                    const itemVariant = item.variantKey || (item.selectedVariants ? Object.values(item.selectedVariants).filter(Boolean).join(' · ') : '');

                    return (
                      <div key={itemKey} className="cart-item">
                        <img src={itemImg} alt={itemTitle} className="cart-item-img" />
                        <div>
                          <h3 className="cart-item-title">{itemTitle}</h3>
                          <div className="cart-item-meta">
                            {itemVariant}
                            {item.isSubscription && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#047857', fontWeight: 700, marginTop: '2px' }}>
                                <RefreshCw size={12} />
                                <span>Abonnement récurrent (-10%)</span>
                              </span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(qty) => updateCartQuantity(itemKey, qty)}
                            />
                            <button
                              type="button"
                              onClick={() => removeFromCart(itemKey)}
                              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}
                              title="Supprimer cet article"
                            >
                              <Trash2 size={14} />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div className="cart-item-price">{(itemPrice * item.quantity).toFixed(2)} €</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {itemPrice.toFixed(2)} € / unité
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Coupon */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                  Récapitulatif de commande
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Sous-total</span>
                    <span style={{ fontWeight: 600 }}>{cartSubtotal.toFixed(2)} €</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-accent-emerald)' }}>
                      <span>Remise ({appliedPromo?.code})</span>
                      <span>-{discountAmount.toFixed(2)} €</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Livraison estimée</span>
                    <span style={{ fontWeight: 600 }}>
                      {remainingForFreeShipping === 0 ? 'Offerte' : 'Dès 3,90 €'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)', fontWeight: 800 }}>
                  <span>Total</span>
                  <span>{estimatedTotal.toFixed(2)} €</span>
                </div>

                {/* Promo Code Input Form */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  {appliedPromo ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}>
                      <span style={{ color: '#047857', fontWeight: 600 }}>
                        Code {appliedPromo.code} appliqué
                      </span>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        style={{ color: '#EF4444', fontWeight: 600 }}
                      >
                        Retirer
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <input
                        type="text"
                        placeholder="Code promo (ex: BIENVENUE10)"
                        className="form-input"
                        style={{ fontSize: 'var(--text-xs)' }}
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                      />
                      <button type="submit" className="btn btn-secondary btn-sm">
                        Appliquer
                      </button>
                    </form>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  onClick={() => onNavigate('checkout')}
                >
                  <span>Passer au paiement</span>
                  <ArrowRight size={18} />
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> Paiement 100% sécurisé
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={14} /> Expédié sous 24h
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Cross-Sells "Vous pourriez aussi aimer" */}
        {crossSells.length > 0 && (
          <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                Suggestions pour compléter votre commande
              </span>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: 'var(--space-1)' }}>
                Vous pourriez aussi aimer
              </h2>
            </div>

            <div className="products-grid">
              {crossSells.map((prod) => (
                <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
