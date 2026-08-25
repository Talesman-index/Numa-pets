import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({ value = 1, min = 1, max = 99, onChange }) => {
  return (
    <div className="qty-selector">
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuer la quantité"
      >
        <Minus size={14} />
      </button>
      <span className="qty-value">{value}</span>
      <button
        type="button"
        className="qty-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Augmenter la quantité"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
