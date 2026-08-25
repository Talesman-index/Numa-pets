import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, reviewCount, size = 14, showText = true }) => {
  const rounded = Math.round(rating * 10) / 10;
  return (
    <div className="star-rating" aria-label={`Note de ${rounded} sur 5`}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= Math.round(rating) ? '#FFAE01' : '#E5E7EB'}
            color={star <= Math.round(rating) ? '#FFAE01' : '#D1D5DB'}
          />
        ))}
      </div>
      {showText && (
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', marginLeft: '4px' }}>
          {rounded} {reviewCount !== undefined && <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({reviewCount})</span>}
        </span>
      )}
    </div>
  );
};
