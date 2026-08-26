import React from 'react';
import { ChevronDown, Mouse } from 'lucide-react';

export const ScrollDownIndicator = ({ targetId }) => {
  const handleClick = () => {
    const el = targetId ? document.getElementById(targetId) : null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      className="scroll-down-indicator"
      onClick={handleClick}
      aria-label="Défiler vers le bas"
    >
      {/* Mouse icon with animated scroll dot */}
      <div className="sdi-mouse">
        <div className="sdi-mouse-dot" />
      </div>
      {/* Chevrons cascade */}
      <div className="sdi-chevrons">
        <ChevronDown size={14} className="sdi-chevron sdi-chevron--1" />
        <ChevronDown size={14} className="sdi-chevron sdi-chevron--2" />
      </div>
    </button>
  );
};
