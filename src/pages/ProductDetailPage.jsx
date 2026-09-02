import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { StarRating } from '../components/common/StarRating';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { ProductCard } from '../components/common/ProductCard';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  MessageSquarePlus,
  Star,
  Leaf,
  Zap,
  Droplets,
  ThumbsUp,
  BadgeCheck
} from 'lucide-react';

// Maps each benefit index to a distinct icon
const BENEFIT_ICONS = [Sparkles, Leaf, Zap, Droplets, ShieldCheck, ThumbsUp, BadgeCheck, Truck];

export const ProductDetailPage = ({ slug, onNavigate }) => {
  const { products, addToCart, toggleFavorite, isFavorite, addProductReview, showToast } = useStore();

  const product = products.find((p) => p.slug === slug) || products[0];
  const isFav = isFavorite(product.id);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState(0);

  // Purchase Mode (One-time vs Subscription)
  const [isSubscription, setIsSubscription] = useState(false);

  // Variants selection state
  const [selectedVariants, setSelectedVariants] = useState(() => {
    const initial = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    benefits: true,
    howTo: true,
    materials: false,
    safety: false,
    shipping: false
  });

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVariantChange = (variantName, optionValue) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: optionValue }));
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity, isSubscription);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) {
      showToast('Veuillez remplir votre nom et votre commentaire', 'error');
      return;
    }
    addProductReview(product.id, {
      author: newReviewAuthor,
      rating: Number(newReviewRating),
      title: newReviewTitle || 'Très bon produit',
      text: newReviewText
    });
    setShowReviewModal(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewText('');
  };

  // Cross-sells
  const crossSellProducts = products
    .filter((p) => product.crossSellIds?.includes(p.id))
    .slice(0, 3);

  const breadcrumbsItems = [
    { label: product.animal === 'dog' ? 'Chien' : 'Chat', route: product.animal === 'dog' ? 'chien' : 'chat' },
    { label: product.categoryLabel, route: 'nos-essentiels' },
    { label: product.title }
  ];

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        <Breadcrumbs items={breadcrumbsItems} onNavigate={onNavigate} />

        <div className="pdp-grid">
          {/* Left Column: Image Gallery */}
          <div>
            <div className="pdp-gallery-main">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
              />
            </div>

            {product.images.length > 1 && (
              <div className="pdp-thumbnails">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`pdp-thumb ${selectedImage === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img src={img} alt={`${product.title} vue ${idx + 1}`} />
                  </div>
                ))}
              </div>
            )}

            {/* Quality badge highlight below gallery */}
            <div className="pdp-trust-highlights">
              <div className="pdp-trust-item">
                <Truck size={16} color="var(--color-brand-primary)" />
                <span>Expédié sous 24h ouvrées</span>
              </div>
              <div className="pdp-trust-item">
                <RotateCcw size={16} color="var(--color-brand-primary)" />
                <span>Retours sous 30 jours</span>
              </div>
              <div className="pdp-trust-item">
                <ShieldCheck size={16} color="var(--color-brand-primary)" />
                <span>Formule &amp; matériaux testés</span>
              </div>
              <div className="pdp-trust-item">
                <Sparkles size={16} color="var(--color-brand-primary)" />
                <span>0 ingrédient superflu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Purchase */}
          <div className="pdp-info-col">
            <div className="pdp-badge-row">
              <span className={`badge ${product.animal === 'dog' ? 'badge-dog' : 'badge-cat'}`}>
                {product.animal === 'dog' ? 'Chien' : 'Chat'}
              </span>
              <span className="pdp-category-label">
                {product.categoryLabel}
              </span>
              {product.isBestSeller && <span className="badge badge-bestseller">Best-seller</span>}
            </div>

            <h1 className="pdp-product-title">
              {product.title}
            </h1>

            <div className="pdp-meta-row">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="pdp-meta-divider">|</span>
              <span className={`pdp-stock-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                <span className="pdp-stock-dot" />
                {product.inStock ? `En stock (${product.stockQuantity} disponibles)` : 'Rupture temporaire'}
              </span>
            </div>

            <p className="pdp-description">
              {product.description}
            </p>

            {/* Purchase Mode Toggle (One-time vs Subscription) */}
            <div className="purchase-options">
              <div
                className={`purchase-option-card ${!isSubscription ? 'selected' : ''}`}
                onClick={() => setIsSubscription(false)}
              >
                <div className="pdp-option-left">
                  <input
                    type="radio"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                    aria-label="Achat unique"
                  />
                  <div>
                    <div className="pdp-option-title">Achat unique</div>
                    <div className="pdp-option-desc">Commande ponctuelle sans engagement</div>
                  </div>
                </div>
                <div className="pdp-option-price">
                  {product.price.toFixed(2)} €
                </div>
              </div>

              <div
                className={`purchase-option-card ${isSubscription ? 'selected' : ''}`}
                onClick={() => setIsSubscription(true)}
              >
                <div className="pdp-option-left">
                  <input
                    type="radio"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                    aria-label="Livraison automatique"
                  />
                  <div>
                    <div className="pdp-option-title-wrap">
                      <span className="pdp-option-title">Livraison automatique</span>
                      <span className="badge badge-discount-pill">-10%</span>
                    </div>
                    <div className="pdp-option-desc-sub">
                      Livré tous les 2 mois • Modifiable ou annulable en 1 clic
                    </div>
                  </div>
                </div>
                <div className="pdp-option-price-col">
                  <div className="pdp-option-price pdp-option-price--discounted">
                    {product.subscriptionPrice.toFixed(2)} €
                  </div>
                  <div className="pdp-option-price--old">
                    {product.price.toFixed(2)} €
                  </div>
                </div>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.map((v) => (
              <div key={v.id} className="variant-options-group">
                <div className="variant-label">
                  {v.name} : <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>{selectedVariants[v.name]}</span>
                </div>
                <div className="variant-pills">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`variant-pill ${selectedVariants[v.name] === opt ? 'active' : ''}`}
                      onClick={() => handleVariantChange(v.name, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity and Add to Cart Button */}
            <div className="pdp-action-bar">
              <div className="pdp-qty-wrap">
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg pdp-btn-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag size={18} />
                <span>
                  Ajouter au panier — {((isSubscription ? product.subscriptionPrice : product.price) * quantity).toFixed(2)} €
                </span>
              </button>

              <button
                type="button"
                className={`header-icon-btn pdp-fav-btn ${isFav ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart size={20} fill={isFav ? '#E11D48' : 'none'} color={isFav ? '#E11D48' : 'currentColor'} />
              </button>
            </div>

            {/* ── Avantages produits visuels ── */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="pdp-benefits-block">
                <div className="pdp-benefits-label">
                  <Sparkles size={14} />
                  <span>Pourquoi vous allez l'aimer</span>
                </div>
                <div className="pdp-benefits-grid">
                  {product.highlights.map((h, i) => {
                    const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                    return (
                      <div key={i} className="pdp-benefit-card">
                        <div className="pdp-benefit-icon">
                          <Icon size={18} />
                        </div>
                        <p className="pdp-benefit-text">{h}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Storytelling Produit NÜMA ── */}
            <div style={{
              backgroundColor: '#FAF6ED',
              border: '1px solid rgba(255, 107, 0, 0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-4) var(--space-5)',
              margin: 'var(--space-6) 0',
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'center'
            }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 107, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Heart size={20} color="#FF6B00" />
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FF6B00', marginBottom: 2 }}>
                  Ce que NÜMA vous propose
                </div>
                <p style={{ fontSize: '0.88rem', color: '#333333', lineHeight: 1.5, margin: 0 }}>
                  Une conception ergonomique et bienveillante, testée pour durer et respecter la physiologie de votre {product.animal === 'dog' ? 'chien' : 'chat'} au quotidien.
                </p>
              </div>
            </div>

            {/* Accordion Sections */}
            <div className="pdp-accordion">
              {/* Section 2: Comment l'utiliser */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('howTo')}
                >
                  <span>Comment l’utiliser</span>
                  {openAccordions.howTo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordions.howTo && (
                  <div className="accordion-content">
                    <p>{product.howToUse}</p>
                  </div>
                )}
              </div>

              {/* Section 3: Composition / Matériaux */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('materials')}
                >
                  <span>Composition / Matériaux</span>
                  {openAccordions.materials ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordions.materials && (
                  <div className="accordion-content">
                    <p>{product.materials}</p>
                  </div>
                )}
              </div>

              {/* Section 4: Sécurité & conformité */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('safety')}
                >
                  <span>Sécurité & conformité</span>
                  {openAccordions.safety ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordions.safety && (
                  <div className="accordion-content">
                    <p>{product.safetyInfo}</p>
                  </div>
                )}
              </div>

              {/* Section 5: Livraison & retours */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('shipping')}
                >
                  <span>Livraison & retours</span>
                  {openAccordions.shipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordions.shipping && (
                  <div className="accordion-content">
                    <p>{product.shippingInfo}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section Cross-Sell : Complétez sa routine */}
        {crossSellProducts.length > 0 && (
          <div style={{ marginTop: 'var(--space-16)', paddingTop: 'var(--space-12)', borderTop: '1px solid var(--color-border)' }}>
            <div style={{ marginBottom: 'var(--space-8)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                Association conseillée
              </span>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: 'var(--space-1)' }}>
                Complétez sa routine
              </h2>
            </div>

            <div className="products-grid">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}

        {/* Section Avis Clients */}
        <div className="pdp-reviews-section">
          <div className="pdp-reviews-header">
            <div>
              <span className="pdp-reviews-tag">
                Transparence &amp; Retours
              </span>
              <h2 className="pdp-reviews-title">
                Avis clients
                <span className="pdp-reviews-count-pill">{product.reviewCount || product.reviews?.length || 0}</span>
              </h2>
            </div>

            <button
              type="button"
              className="btn btn-primary pdp-btn-review"
              onClick={() => setShowReviewModal(true)}
            >
              <MessageSquarePlus size={16} />
              <span>Donner mon avis</span>
            </button>
          </div>

          {/* Rating Summary Box */}
          <div className="pdp-rating-summary">
            <div className="pdp-rating-score-col">
              <div className="pdp-rating-number">{product.rating}</div>
              <div className="pdp-rating-stars-wrap">
                <StarRating rating={product.rating} showText={false} size={18} />
              </div>
              <div className="pdp-rating-count-text">
                Basé sur {product.reviewCount} avis vérifiés
              </div>
              <div className="pdp-rating-recommend">
                <BadgeCheck size={14} color="#10B981" />
                <span>98% recommandent ce produit</span>
              </div>
            </div>

            <div className="pdp-rating-bars-col">
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct = stars === 5 ? '85%' : stars === 4 ? '12%' : stars === 3 ? '2%' : '1%';
                const count = stars === 5
                  ? Math.round((product.reviewCount || 0) * 0.85)
                  : stars === 4
                  ? Math.round((product.reviewCount || 0) * 0.12)
                  : stars === 3 ? Math.round((product.reviewCount || 0) * 0.02) : 0;
                return (
                  <div key={stars} className="pdp-rating-bar-row">
                    <span className="pdp-rating-bar-label">{stars} ★</span>
                    <div className="pdp-rating-bar-track">
                      <div className="pdp-rating-bar-fill" style={{ width: pct }} />
                    </div>
                    <span className="pdp-rating-bar-percent">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="pdp-reviews-list">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="pdp-review-card">
                  {/* Avatar + header */}
                  <div className="pdp-review-card-header">
                    <div className="pdp-review-author-wrap">
                      <div className="pdp-review-avatar">
                        {rev.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="pdp-review-author-name">{rev.author}</div>
                        <div className="pdp-review-author-meta">
                          <StarRating rating={rev.rating} showText={false} size={12} />
                          <span className="pdp-review-verified-badge">
                            <CheckCircle2 size={11} /> Achat vérifié
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="pdp-review-date">{rev.date || ''}</span>
                  </div>
                  <h4 className="pdp-review-title">{rev.title}</h4>
                  <p className="pdp-review-text">{rev.text}</p>
                  <div className="pdp-review-helpful">
                    <ThumbsUp size={13} />
                    <span>Avis utile</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="pdp-reviews-empty-state">
                <MessageSquarePlus size={36} color="var(--color-brand-primary)" />
                <p>Soyez le premier à partager votre expérience.</p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowReviewModal(true)}
                >
                  Écrire un avis
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Laisser un avis */}
        {showReviewModal && (
          <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>

            <div className="review-modal" onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div className="review-modal-header">
                <div className="review-modal-product-pill">
                  <span className={`badge ${product.animal === 'dog' ? 'badge-dog' : 'badge-cat'}`}>
                    {product.animal === 'dog' ? 'Chien' : 'Chat'}
                  </span>
                  <span className="review-modal-product-name">{product.title}</span>
                </div>
                <button
                  type="button"
                  className="review-modal-close"
                  onClick={() => setShowReviewModal(false)}
                  aria-label="Fermer"
                >
                  ✕
                </button>
              </div>

              <div className="review-modal-body">
                <h3 className="review-modal-title">Partagez votre expérience</h3>
                <p className="review-modal-subtitle">
                  Votre avis aide d'autres propriétaires à faire le bon choix.
                </p>

                <form onSubmit={handleReviewSubmit} className="review-modal-form">

                  {/* Star Rating Interactive */}
                  <div className="form-group">
                    <label className="form-label">Votre note</label>
                    <div className="review-star-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`review-star-btn ${newReviewRating >= star ? 'active' : ''}`}
                          onClick={() => setNewReviewRating(star)}
                          aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="review-star-label">
                        {newReviewRating === 5 ? 'Excellent !' :
                         newReviewRating === 4 ? 'Très bon' :
                         newReviewRating === 3 ? 'Moyen' :
                         newReviewRating === 2 ? 'Décevant' :
                         newReviewRating === 1 ? 'Mauvais' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Nom */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="review-author">Votre prénom ou pseudo</label>
                    <input
                      id="review-author"
                      type="text"
                      className="form-input"
                      placeholder="Ex : Camille L."
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      required
                    />
                  </div>

                  {/* Titre */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="review-title">Titre de votre avis</label>
                    <input
                      id="review-title"
                      type="text"
                      className="form-input"
                      placeholder="Ex : Très pratique au quotidien"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                    />
                  </div>

                  {/* Texte */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="review-text">Votre commentaire</label>
                    <textarea
                      id="review-text"
                      className="form-input"
                      rows="4"
                      placeholder="Décrivez votre expérience avec ce produit : qualité, usage au quotidien, ce que vous et votre animal en pensez..."
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      required
                    />
                  </div>

                  {/* Disclaimer */}
                  <p className="review-modal-disclaimer">
                    🔒 Votre avis est publié anonymement et ne sera pas partagé à des tiers.
                  </p>

                  {/* Actions */}
                  <div className="review-modal-actions">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setShowReviewModal(false)}
                    >
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <MessageSquarePlus size={16} />
                      Publier mon avis
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
