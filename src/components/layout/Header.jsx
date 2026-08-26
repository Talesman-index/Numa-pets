import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight, Search, User, ShoppingBag, SlidersHorizontal,
  Menu, X, PawPrint, Truck, Sparkles, Package, ChevronRight,
  Heart, HelpCircle, BookOpen, Home, Dog
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const navItems = [
  { id: 'accueil',        label: 'Accueil',          icon: Home },
  { id: 'chien',          label: 'Chien',             icon: null },
  { id: 'chat',           label: 'Chat',              icon: null },
  { id: 'nos-essentiels', label: 'Nos essentiels',    icon: null },
  { id: 'conseils',       label: 'Le Journal',        icon: BookOpen },
  { id: 'a-propos',       label: 'À propos',          icon: Heart },
  { id: 'faq',            label: 'Aide & FAQ',        icon: HelpCircle },
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
        {/* ── Top announcement bar ── */}
        <div className="top-amber-announcement" style={{ backgroundColor: '#4E0000', color: '#FFAE01' }}>
          <div className="container top-amber-inner">
            <span className="announce-item">
              <Truck size={12} color="#FFAE01" />
              <span>Livraison offerte dès 49€</span>
            </span>
            <span className="announcement-bullet">•</span>
            <span className="announce-item announce-hide-xs">Expédié sous 24h</span>
            <span className="announcement-bullet announce-hide-xs">•</span>
            <span className="announce-item announce-hide-xs">Retours 30 jours</span>
            <span className="announcement-bullet">•</span>
            <span className="announce-item" style={{ color: '#FFFFFF' }}>Abonnement -10%</span>
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

            {/* Desktop nav — hidden on mobile */}
            <nav className="cream-nav-links">
              {navItems.slice(0, 6).map((item) => (
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
            <div className="cream-header-actions">
              {/* Search — hidden on mobile (in drawer) */}
              <button
                type="button"
                className="cream-icon-btn cream-desktop-only"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Rechercher"
              >
                <Search size={17} />
              </button>

              {/* Account — hidden on mobile (in drawer) */}
              <button
                type="button"
                className="cream-icon-btn cream-desktop-only"
                onClick={() => handleNav('compte')}
                aria-label="Mon compte"
              >
                <User size={17} />
              </button>

              {/* Cart — always visible */}
              <button
                type="button"
                className="cream-icon-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label="Panier"
                style={{ position: 'relative' }}
              >
                <ShoppingBag size={17} />
                {cartCount > 0 && (
                  <span className="cream-badge-count">{cartCount}</span>
                )}
              </button>

              {/* Admin pill — desktop only */}
              <button
                type="button"
                onClick={() => handleNav('admin')}
                className="cream-admin-pill cream-desktop-only"
                title="Admin"
              >
                <SlidersHorizontal size={13} />
                <span>Admin</span>
              </button>

              {/* Boutique CTA — desktop only */}
              <button
                type="button"
                onClick={() => handleNav('nos-essentiels')}
                className="cream-cta-orange cream-desktop-only"
              >
                <span>Boutique</span>
                <div className="cta-arrow-circle">
                  <ArrowUpRight size={14} />
                </div>
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
        <div className="cream-mobile-drawer" role="dialog" aria-modal="true" aria-label="Menu principal">

          {/* Drawer top bar */}
          <div className="cream-drawer-topbar">
            <div className="cream-drawer-logo">
              <div className="sunburst-logo-icon" style={{ width: 30, height: 30 }}>
                <PawPrint size={14} fill="#FFAE01" color="#FFAE01" />
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
              <Truck size={12} color="#FFAE01" />
              <span>Livraison offerte dès 49€</span>
            </div>
            <div className="cream-drawer-badge-pill">
              <Package size={12} color="#FFAE01" />
              <span>Expédié sous 24h · Retours 30j</span>
            </div>
          </div>

          {/* Section label */}
          <div className="cream-drawer-section-label">Navigation</div>

          {/* Nav links */}
          <div className="cream-drawer-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`cream-mobile-link ${currentRoute === item.id ? 'active' : ''}`}
              >
                <ChevronRight
                  size={14}
                  color={currentRoute === item.id ? '#FFAE01' : 'rgba(255,255,255,0.3)'}
                />
                {item.label}
              </button>
            ))}
          </div>

          {/* Section label — Compte */}
          <div className="cream-drawer-section-label">Mon compte</div>

          {/* Account links in drawer */}
          <div className="cream-drawer-nav" style={{ paddingTop: 6, flex: 'none' }}>
            <button
              type="button"
              onClick={() => handleNav('compte')}
              className="cream-mobile-link"
            >
              <User size={14} color="rgba(255,255,255,0.4)" />
              Mon espace client
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true) || setDrawerOpen(false)}
              className="cream-mobile-link"
            >
              <Search size={14} color="rgba(255,255,255,0.4)" />
              Rechercher un produit
            </button>
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="cream-mobile-link"
            >
              <SlidersHorizontal size={14} color="rgba(255,255,255,0.4)" />
              Back-Office Admin
            </button>
          </div>

          {/* Bottom CTA */}
          <div className="cream-drawer-bottom">
            <button
              type="button"
              onClick={() => handleNav('nos-essentiels')}
              className="cream-drawer-cta-primary"
            >
              <Sparkles size={15} />
              Voir la boutique
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
