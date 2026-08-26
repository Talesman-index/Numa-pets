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
  Star
} from 'lucide-react';

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

            {/* Accordion Sections */}
            <div className="pdp-accordion">
              {/* Section 1: Pourquoi vous allez l'aimer */}
              <div className="accordion-item">
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion('benefits')}
                >
                  <span>Pourquoi vous allez l’aimer</span>
                  {openAccordions.benefits ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordions.benefits && (
                  <div className="accordion-content">
                    <ul style={{ paddingLeft: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {product.highlights?.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

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
                Avis clients ({product.reviewCount || product.reviews?.length || 0})
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
              <div className="pdp-rating-number">
                {product.rating}
              </div>
              <div className="pdp-rating-stars-wrap">
                <StarRating rating={product.rating} showText={false} size={18} />
              </div>
              <div className="pdp-rating-count-text">
                Basé sur {product.reviewCount} évaluations
              </div>
            </div>

            <div className="pdp-rating-bars-col">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="pdp-rating-bar-row">
                  <span className="pdp-rating-bar-label">{stars} étoiles</span>
                  <div className="pdp-rating-bar-track">
                    <div
                      className="pdp-rating-bar-fill"
                      style={{ width: stars === 5 ? '85%' : stars === 4 ? '12%' : '3%' }}
                    />
                  </div>
                  <span className="pdp-rating-bar-percent">
                    {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="pdp-reviews-list">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div key={rev.id} className="pdp-review-card">
                  <div className="pdp-review-card-header">
                    <div className="pdp-review-author-wrap">
                      <StarRating rating={rev.rating} showText={false} />
                      <span className="pdp-review-author-name">{rev.author}</span>
                      <span className="pdp-review-verified-badge">
                        <CheckCircle2 size={12} /> Achat vérifié
                      </span>
                    </div>
                    <span className="pdp-review-date">{rev.date}</span>
                  </div>
                  <h4 className="pdp-review-title">{rev.title}</h4>
                  <p className="pdp-review-text">
                    {rev.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="pdp-reviews-empty">
                Soyez le premier à donner votre avis sur ce produit.
              </p>
            )}
          </div>
        </div>

        {/* Modal Write Review */}
        {showReviewModal && (
          <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500, padding: 'var(--space-6)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                Donner votre avis sur {product.title}
              </h3>

              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label className="form-label">Votre Prénom ou Nom</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Camille L."
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Note sur 5</label>
                  <select
                    className="form-input"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(e.target.value)}
                  >
                    <option value="5">★★★★★ (5/5) Excellent</option>
                    <option value="4">★★★★☆ (4/5) Très bon</option>
                    <option value="3">★★★☆☆ (3/5) Moyen</option>
                    <option value="2">★★☆☆☆ (2/5) Décevant</option>
                    <option value="1">★☆☆☆☆ (1/5) Mauvais</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Titre du commentaire</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Très pratique au quotidien"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Votre avis détaillé</label>
                  <textarea
                    className="form-input"
                    rows="4"
                    placeholder="Partagez votre retour d’expérience avec ce produit..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowReviewModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Publier l’avis
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
