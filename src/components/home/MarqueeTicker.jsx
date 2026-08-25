import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, HeartHandshake, RefreshCw, Star } from 'lucide-react';

export const MarqueeTicker = () => {
  const items = [
    { icon: <Sparkles size={15} color="#FFAE01" />, text: 'Catalogue court & exigeant' },
    { icon: <Truck size={15} color="#FFAE01" />, text: 'Expédié sous 24h depuis la France' },
    { icon: <ShieldCheck size={15} color="#FFAE01" />, text: 'Zéro ingrédient superflu' },
    { icon: <Star size={15} color="#FFAE01" fill="#FFAE01" />, text: '4.9/5 Avis clients certifiés' },
    { icon: <RotateCcw size={15} color="#FFAE01" />, text: 'Retours gratuits sous 30 jours' },
    { icon: <RefreshCw size={15} color="#FFAE01" />, text: 'Livraison automatique -10% sans engagement' },
    { icon: <HeartHandshake size={15} color="#FFAE01" />, text: 'Conçu pour leur bien-être' }
  ];

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            {item.icon}
            <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{item.text}</span>
            <span style={{ color: '#FFAE01', opacity: 0.5, marginLeft: 'var(--space-4)' }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
