import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { QuantitySelector } from '../common/QuantitySelector';

export const CartDrawer = ({ onNavigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    remainingForFreeShipping,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    products
  } = useStore();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  // Cross-sell suggestions (items not in cart)
  const suggestions = products
    .filter((p) => !cart.some((item) => item.product.id === p.id))
    .slice(0, 2);

  const handleCheckout = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    onNavigate('panier');
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <ShoppingBag size={20} />
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Votre panier</h3>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>({cartCount})</span>
          </div>
          <button
            type="button"
            className="header-icon-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Fermer le panier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <div className="shipping-progress-box">
            <div className="shipping-progress-text">
              {remainingForFreeShipping > 0 ? (
                <span>
                  Plus que <strong>{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte !
                </span>
              ) : (
                <span style={{ color: 'var(--color-accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> <strong>Livraison offerte débloquée !</strong>
                </span>
              )}
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Body Items */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
                <ShoppingBag size={28} color="var(--color-text-muted)" />
              </div>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Votre panier est vide</h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                Découvrez nos essentiels pour chien et chat soigneusement sélectionnés.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigate('nos-essentiels');
                }}
              >
                Découvrir nos essentiels
              </button>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {cart.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <img src={item.product.images[0]} alt={item.product.title} className="cart-item-img" />
                    <div>
                      <h4 className="cart-item-title">{item.product.title}</h4>
                      <div className="cart-item-meta">
                        {item.variantKey}
                        {item.isSubscription && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#047857', fontWeight: 700 }}>
                            <RefreshCw size={12} />
                            <span>Livraison récurrente (-10%)</span>
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(newQty) => updateCartQuantity(item.cartId, newQty)}
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}
                          title="Supprimer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="cart-item-price">{(item.unitPrice * item.quantity).toFixed(2)} €</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {item.unitPrice.toFixed(2)} € / u
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cross-Sell Suggestions */}
              {suggestions.length > 0 && (
                <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                    Vous pourriez aussi aimer
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {suggestions.map((sug) => (
                      <div key={sug.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-2) var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                          <img src={sug.images[0]} alt={sug.title} style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{sug.title}</div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{sug.price.toFixed(2)} €</div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            const defVariants = {};
                            if (sug.variants) sug.variants.forEach((v) => { defVariants[v.name] = v.options[0]; });
                            useStore().addToCart(sug, defVariants, 1, false);
                          }}
                        >
                          + Ajouter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Sous-total</span>
              <span style={{ fontWeight: 700 }}>{cartSubtotal.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              <span>Frais de livraison</span>
              <span>{remainingForFreeShipping === 0 ? 'Gratuit' : 'Calculé à l’étape suivante'}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block btn-lg"
              onClick={handleCheckout}
              style={{ marginBottom: 'var(--space-2)' }}
            >
              <span>Passer au paiement</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-outline btn-block btn-sm"
              onClick={handleViewCart}
            >
              Voir le panier complet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
