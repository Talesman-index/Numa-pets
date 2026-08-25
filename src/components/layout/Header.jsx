import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight, Search, User, ShoppingBag, SlidersHorizontal,
  Menu, X, PawPrint, Truck, Sparkles, Package, ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const navItems = [
  { id: 'accueil',       label: 'Accueil',          icon: null },
  { id: 'chien',         label: 'Chien',             icon: null },
  { id: 'chat',          label: 'Chat',              icon: null },
  { id: 'nos-essentiels',label: 'Nos essentiels',    icon: null },
  { id: 'conseils',      label: 'Le Journal',        icon: null },
  { id: 'a-propos',      label: 'À propos',          icon: null },
  { id: 'faq',           label: 'Aide & FAQ',        icon: null },
];

export const Header = ({ currentRoute, onNavigate }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (routeId) => {
    onNavigate(routeId);
    setDrawerOpen(false);
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      <header className="cream-header-wrap">
        {/* ── Top amber announcement bar ── */}
        <div className="top-amber-announcement" style={{ backgroundColor: '#4E0000', color: '#FFAE01' }}>
          <div className="container top-amber-inner">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <Truck size={13} color="#FFAE01" />
              LIVRAISON OFFERTE DÈS 49€
            </span>
            <span className="announcement-bullet">•</span>
            <span>EXPÉDIÉ SOUS 24H</span>
            <span className="announcement-bullet">•</span>
            <span>RETOURS 30 JOURS</span>
            <span className="announcement-bullet">•</span>
            <span style={{ color: '#FFFFFF' }}>ABONNEMENT -10%</span>
          </div>
        </div>

        {/* ── Main header bar ── */}
        <div className="cream-header">
          <div className="container cream-header-inner">

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="cream-mobile-menu-btn"
              onClick={() => setDrawerOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNav('accueil')}
              className="cream-logo"
            >
              <div className="sunburst-logo-icon">
                <PawPrint size={18} fill="#4E0000" color="#4E0000" />
              </div>
              <span className="cream-logo-text" style={{ color: '#4E0000' }}>MOKI</span>
            </button>

            {/* Desktop nav */}
            <nav className="cream-nav-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`cream-nav-link ${currentRoute === item.id ? 'active' : ''}`}
                  style={{ color: currentRoute === item.id ? '#FFAE01' : '#4E0000' }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button type="button" className="cream-icon-btn" onClick={() => setIsSearchOpen(true)} aria-label="Rechercher">
                <Search size={17} />
              </button>
              <button type="button" className="cream-icon-btn" onClick={() => handleNav('compte')} aria-label="Mon compte">
                <User size={17} />
              </button>
              <button type="button" className="cream-icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Panier" style={{ position: 'relative' }}>
                <ShoppingBag size={17} />
                {cartCount > 0 && <span className="cream-badge-count">{cartCount}</span>}
              </button>
              <button type="button" onClick={() => handleNav('admin')} className="cream-admin-pill" title="Admin">
                <SlidersHorizontal size={13} /><span>Admin</span>
              </button>
              <button type="button" onClick={() => handleNav('nos-essentiels')} className="cream-cta-orange">
                <span>Boutique</span>
                <div className="cta-arrow-circle"><ArrowUpRight size={14} /></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Overlay ── */}
      {drawerOpen && (
        <div
          className="cream-mobile-overlay"
          onClick={() => setDrawerOpen(false)}
          aria-label="Fermer le menu"
        />
      )}

      {/* ── Mobile Side Drawer ── */}
      {drawerOpen && (
        <div className="cream-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu de navigation">

          {/* Drawer top bar */}
          <div className="cream-drawer-topbar">
            <div className="cream-drawer-logo">
              <div className="sunburst-logo-icon" style={{ width: 30, height: 30 }}>
                <PawPrint size={15} fill="#FFAE01" color="#FFAE01" />
              </div>
              <span>MOKI</span>
            </div>
            <button
              type="button"
              className="cream-drawer-close-btn"
              onClick={() => setDrawerOpen(false)}
              aria-label="Fermer"
            >
              <X size={17} />
            </button>
          </div>

          {/* Reassurance pills */}
          <div className="cream-drawer-badges">
            <div className="cream-drawer-badge-pill">
              <Truck size={13} color="#FFAE01" />
              <span>Livraison offerte dès 49€</span>
            </div>
            <div className="cream-drawer-badge-pill">
              <Package size={13} color="#FFAE01" />
              <span>Expédié sous 24h • Retours 30j</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="cream-drawer-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`cream-mobile-link ${currentRoute === item.id ? 'active' : ''}`}
              >
                <ChevronRight size={15} color={currentRoute === item.id ? '#FFAE01' : 'rgba(255,255,255,0.4)'} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div className="cream-drawer-bottom">
            <button type="button" onClick={() => handleNav('nos-essentiels')} className="cream-drawer-cta-primary">
              <Sparkles size={15} />
              Voir la boutique
              <ArrowUpRight size={15} />
            </button>
            <button type="button" onClick={() => handleNav('compte')} className="cream-drawer-cta-secondary">
              <User size={15} />
              Mon espace client
            </button>
            <button type="button" onClick={() => handleNav('admin')} className="cream-drawer-cta-secondary">
              <SlidersHorizontal size={15} />
              Back-Office Admin
            </button>
          </div>
        </div>
      )}
    </>
  );
};
