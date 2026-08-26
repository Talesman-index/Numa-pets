import React from 'react';
import { ChevronDown, PawPrint } from 'lucide-react';

export const ScrollDownIndicator = ({ targetId = 'histoire-section' }) => {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <div className="sdi-wrapper">
      <button
        type="button"
        className="sdi-pill-btn"
        onClick={handleClick}
        aria-label="Défiler pour explorer l'univers NÜMA"
      >
        {/* Animated gliding track with glowing bead */}
        <div className="sdi-track">
          <div className="sdi-glow-bead" />
        </div>

        {/* Text and animated paw badge */}
        <div className="sdi-content">
          <span className="sdi-label">DÉCOUVRIR</span>
          <span className="sdi-dot">•</span>
          <span className="sdi-sub">EXPLORER</span>
        </div>

        {/* Animated bouncing arrow container */}
        <div className="sdi-arrow-wrap">
          <ChevronDown size={15} className="sdi-arrow sdi-arrow--1" />
          <ChevronDown size={15} className="sdi-arrow sdi-arrow--2" />
        </div>
      </button>
    </div>
  );
};
