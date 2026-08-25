import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const CommunityReviews = () => {
  const reviews = [
    {
      id: 1,
      author: 'Camille & Marley',
      pet: 'Golden Retriever • 3 ans',
      rating: 5,
      title: 'Harnais et shampoing absolument parfaits',
      comment: 'Enfin une marque qui ne cherche pas à vous vendre 50 babioles. Le harnais ne frotte plus du tout les aisselles de Marley, et le shampoing sent délicatement le propre sans parfum synthétique écœurant.',
      date: 'Avis vérifié • Il y a 3 jours',
      avatar: '/images/hero-golden-duo.jpg'
    },
    {
      id: 2,
      author: 'Alexandre & Simba',
      pet: 'Chat Bengal • 2 ans',
      rating: 5,
      title: 'L\'arbre à chat minimaliste et la brosse de mue',
      comment: 'Design magnifique qui s’intègre dans le salon sans faire "animalerie criarde". La brosse enlève le sous-poil mort sans tirer ni stresser mon chat.',
      date: 'Avis vérifié • Il y a 1 semaine',
      avatar: '/images/cat-lying-happy.png'
    },
    {
      id: 3,
      author: 'Élodie & Pixel',
      pet: 'Boston Terrier • 1 an',
      rating: 5,
      title: 'Abonnement routine hygiène au top',
      comment: 'Recevoir les sacs biodégradables et les lingettes tous les 2 mois automatiquement, c’est une charge mentale en moins. Et les 10% de réduction permanente font vraiment la différence.',
      date: 'Avis vérifié • Il y a 2 semaines',
      avatar: '/images/hero-woman-dog.png'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="section paws-reviews-section">
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-12)' }}>
          <div className="paws-section-badge">
            <span>AVIS CLIENTS</span>
          </div>
          <h2 className="paws-section-title">
            Adopté par plus de<br />
            <span style={{ color: 'var(--color-brand-primary)' }}>15 000 maîtres exigeants.</span>
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <div className="paws-review-card-wrap">
          <div className="paws-review-box">
            
            {/* Left Avatar */}
            <div className="paws-review-avatar-wrap">
              <img
                src={current.avatar}
                alt={current.author}
                className="paws-review-avatar-img"
              />
            </div>

            {/* Right Text */}
            <div className="paws-review-text-wrap">
              {/* Stars */}
              <div className="paws-stars-row">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FF6B00" color="#FF6B00" />
                ))}
              </div>

              <h3 className="paws-review-quote-title">« {current.title} »</h3>
              <p className="paws-review-quote-body">"{current.comment}"</p>

              <div className="paws-review-author-meta">
                <div>
                  <div className="paws-review-author-name">{current.author}</div>
                  <div className="paws-review-author-pet">{current.pet}</div>
                </div>
                <div className="paws-verified-tag">
                  <CheckCircle size={13} color="#10B981" />
                  <span>Achat Vérifié</span>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="paws-review-controls">
            <button
              type="button"
              className="paws-review-arrow-btn"
              onClick={prevReview}
              aria-label="Avis précédent"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="paws-review-step">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              type="button"
              className="paws-review-arrow-btn"
              onClick={nextReview}
              aria-label="Avis suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
