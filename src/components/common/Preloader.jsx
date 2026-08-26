import React, { useEffect, useState } from 'react';
import { PawPrint, Sparkles } from 'lucide-react';

/* Dynamic Animated Paw Icon */
const SteppingPaw = ({ delay, side = 'center', size = 22 }) => (
  <div 
    className={`moki-paw-step moki-paw-step--${side}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="#FFAE01"
      className="moki-paw-svg"
      aria-hidden="true"
    >
      {/* Main pad */}
      <path d="M50 82 C35 82 26 71 28 58 C30 46 41 42 50 42 C59 42 70 46 72 58 C74 71 65 82 50 82 Z" />
      {/* 4 toe pads */}
      <ellipse cx="23" cy="36" rx="9" ry="13" transform="rotate(-25 23 36)" />
      <ellipse cx="41" cy="24" rx="9.5" ry="13.5" transform="rotate(-8 41 24)" />
      <ellipse cx="59" cy="24" rx="9.5" ry="13.5" transform="rotate(8 59 24)" />
      <ellipse cx="77" cy="36" rx="9" ry="13" transform="rotate(25 77 36)" />
    </svg>
  </div>
);

export const Preloader = ({ onDone }) => {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 150);
    const t2 = setTimeout(() => setPhase('exit'), 1900);
    const t3 = setTimeout(() => onDone?.(), 2450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className={`moki-preloader moki-preloader--${phase}`} aria-hidden="true">
      {/* Ambient background glowing orbs */}
      <div className="moki-pre-blob moki-pre-blob--1" />
      <div className="moki-pre-blob moki-pre-blob--2" />

      <div className="moki-pre-center">
        {/* Main Emblem: Animated Sunburst + Animal Paw Badge */}
        <div className="moki-pre-emblem-wrap">
          <div className="moki-pre-glow-ring" />
          <div className="moki-pre-orbit-ring" />
          
          <div className="moki-pre-icon-badge">
            <div className="moki-pre-sunburst">
              <svg viewBox="0 0 100 100" className="moki-pre-sunburst-svg">
                <path
                  d="M50 0 L58 14 L74 6 L76 23 L93 23 L87 39 L100 48 L89 60 L98 74 L82 80 L84 97 L68 93 L62 100 L50 89 L38 100 L32 93 L16 97 L18 80 L2 74 L11 60 L0 48 L13 39 L7 23 L24 23 L26 6 L42 14 Z"
                  fill="#FFAE01"
                />
              </svg>
              <div className="moki-pre-badge-inner">
                <PawPrint size={34} fill="#4E0000" color="#4E0000" />
              </div>
            </div>
            <Sparkles size={16} className="moki-pre-sparkle moki-pre-sparkle--1" />
            <Sparkles size={14} className="moki-pre-sparkle moki-pre-sparkle--2" />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="moki-pre-brand">
          <span className="moki-pre-letter" style={{ '--i': 0 }}>M</span>
          <span className="moki-pre-letter" style={{ '--i': 1 }}>O</span>
          <span className="moki-pre-letter" style={{ '--i': 2 }}>K</span>
          <span className="moki-pre-letter" style={{ '--i': 3 }}>I</span>
        </div>

        <p className="moki-pre-tagline">Le soin naturel pour vos animaux</p>

        {/* Stepping Paws Walking Trail Loader (Empreintes de pas en séquence de marche) */}
        <div className="moki-walking-trail-loader" title="Chargement...">
          <SteppingPaw delay={0.0} side="left" size={20} />
          <SteppingPaw delay={0.25} side="right" size={20} />
          <SteppingPaw delay={0.5} side="left" size={20} />
          <SteppingPaw delay={0.75} side="right" size={20} />
          <SteppingPaw delay={1.0} side="left" size={20} />
        </div>
      </div>
    </div>
  );
};
