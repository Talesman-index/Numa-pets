import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, HeartHandshake, RefreshCw, Star } from 'lucide-react';

export const MarqueeTicker = () => {
  const items = [
    { icon: <Sparkles size={15} color="#FFAE01" />, text: 'Catalogue court & maîtrisé' },
    { icon: <Truck size={15} color="#FFAE01" />, text: 'Expédition depuis la France' },
    { icon: <ShieldCheck size={15} color="#FFAE01" />, text: 'Zéro ingrédient superflu' },
    { icon: <HeartHandshake size={15} color="#FFAE01" />, text: 'Soin, promenade, jeu & confort' },
    { icon: <RotateCcw size={15} color="#FFAE01" />, text: 'Retours simplifiés' },
    { icon: <RefreshCw size={15} color="#FFAE01" />, text: 'Livraison récurrente disponible' },
    { icon: <Sparkles size={15} color="#FFAE01" />, text: 'Pensé pour leur quotidien' }
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
