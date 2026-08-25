import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { StarRating } from './StarRating';
import { useStore } from '../../context/StoreContext';

export const ProductCard = ({ product, onNavigate }) => {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const isFav = isFavorite(product.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultVariants = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        defaultVariants[v.name] = v.options[0];
      });
    }
    addToCart(product, defaultVariants, 1, false);
  };

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate(`produit-${product.slug}`);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>
      <div className="product-card-img-wrap">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : '/images/hero-golden-duo.jpg'}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/hero-golden-duo.jpg';
          }}
        />

        {/* Badges */}
        <div className="product-card-badges">
          {product.animal === 'dog' ? (
            <span className="badge badge-dog">Chien</span>
          ) : (
            <span className="badge badge-cat">Chat</span>
          )}
          {product.isBestSeller && <span className="badge badge-bestseller">Best-seller</span>}
          {product.isNew && <span className="badge badge-new">Nouveau</span>}
          {product.isRecurring && (
            <span className="badge badge-subscription">
              Abonnement -10%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          className={`product-card-fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart size={16} fill={isFav ? '#E11D48' : 'none'} color={isFav ? '#E11D48' : 'currentColor'} />
        </button>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.categoryLabel}</span>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-subtitle">{product.subtitle}</p>

        <div className="product-card-rating">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="product-card-footer">
          <div>
            <div className="product-card-price">{product.price.toFixed(2)} €</div>
            {product.isRecurring && (
              <div className="product-card-subprice">
                ou {product.subscriptionPrice.toFixed(2)} € en abonnement
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleQuickAdd}
            title="Ajouter au panier"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', gap: '6px' }}
          >
            <ShoppingBag size={14} />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
