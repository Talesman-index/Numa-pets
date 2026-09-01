import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, Search, User, ShoppingBag, SlidersHorizontal,
  Menu, X, PawPrint, Truck, Sparkles, Package, ChevronRight,
  Heart, HelpCircle, BookOpen, Home, ChevronDown, Cat, Dog
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const navItems = [
  { id: 'accueil',  label: 'Accueil',    icon: Home },
  { id: 'nos-essentiels', label: 'Boutique', icon: null, hasDropdown: true },
  { id: 'conseils', label: 'Le Journal', icon: BookOpen },
  { id: 'a-propos', label: 'À propos',   icon: Heart },
  { id: 'faq',      label: 'Aide & FAQ', icon: HelpCircle },
];

// Mega-dropdown content
const DROPDOWN_SECTIONS = [
  {
    heading: 'Pour mon chien 🐕',
    animal: 'dog',
    links: [
      { label: 'Tous les produits chien', category: 'all' },
      { label: 'Promenade & Harnais',     category: 'walk' },
      { label: 'Soin & Toilette',         category: 'care' },
      { label: 'Jeux & Jouets',           category: 'play' },
    ],
  },
  {
    heading: 'Pour mon chat 🐱',
    animal: 'cat',
    links: [
      { label: 'Tous les produits chat',  category: 'all' },
      { label: 'Soin & Toilette',         category: 'care' },
      { label: 'Jeux & Instinct',         category: 'play' },
      { label: 'Confort & Couchage',      category: 'comfort' },
    ],
  },
];

export const Header = ({ currentRoute, onNavigate }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownTimer = useRef(null);

  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(() => {
    try { return !sessionStorage.getItem('moki_announcement_closed'); }
    catch { return true; }
  });

  const handleCloseAnnouncement = (e) => {
    e.stopPropagation();
    setIsAnnouncementVisible(false);
    try { sessionStorage.setItem('moki_announcement_closed', 'true'); }
    catch { /* ignore */ }
  };

  const handleNav = (routeId, params = {}) => {
    onNavigate(routeId, params);
    setDrawerOpen(false);
    setDropdownOpen(false);
    setMobileShopOpen(false);
  };

  const handleDropdownNav = (animal, category) => {
    handleNav('nos-essentiels', { animal, category });
  };

  // Dropdown mouse events — delay hide to allow moving to dropdown
  const handleMouseEnterTrigger = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };
  const handleMouseEnterDropdown = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close dropdown on route change
  useEffect(() => { setDropdownOpen(false); }, [currentRoute]);

  return (
    <>
      <header className="cream-header-wrap">
        {/* ── Top announcement bar ── */}
        {isAnnouncementVisible && (
          <div className="top-amber-announcement" style={{ backgroundColor: '#4E0000', color: '#FFAE01' }}>
            <div className="container top-amber-inner">
              <span className="announce-item">
                <Truck size={12} color="#FFAE01" />
                <span>Livraison en France</span>
              </span>
              <span className="announcement-bullet">•</span>
              <span className="announce-item announce-hide-xs">Expédition depuis la France</span>
              <span className="announcement-bullet announce-hide-xs">•</span>
              <span className="announce-item announce-hide-xs">Retours simplifiés</span>
              <span className="announcement-bullet">•</span>
              <span className="announce-item" style={{ color: '#FFFFFF' }}>Livraison récurrente disponible</span>
            </div>
            <button
              type="button"
              className="top-amber-close-btn"
              onClick={handleCloseAnnouncement}
              aria-label="Fermer l'alerte"
            >
              <X size={13} />
            </button>
          </div>
        )}

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
              <span className="cream-logo-text" style={{ color: '#4E0000' }}>NÜMA</span>
            </button>

            {/* ── Desktop nav ── */}
            <nav className="cream-nav-links" ref={dropdownRef}>
              {navItems.slice(0, 5).map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      className="nav-dropdown-wrapper"
                      onMouseEnter={handleMouseEnterTrigger}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        type="button"
                        onClick={() => handleNav(item.id)}
                        className={`cream-nav-link nav-dropdown-trigger ${
                          ['nos-essentiels','chien','chat'].includes(currentRoute) ? 'active' : ''
                        }`}
                        style={{
                          color: ['nos-essentiels','chien','chat'].includes(currentRoute)
                            ? '#FFAE01' : '#4E0000',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          size={13}
                          style={{
                            transition: 'transform 0.2s',
                            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      </button>

                      {/* ── Mega Dropdown ── */}
                      {dropdownOpen && (
                        <div
                          className="nav-mega-dropdown"
                          onMouseEnter={handleMouseEnterDropdown}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="nav-mega-inner">
                            {DROPDOWN_SECTIONS.map((section) => (
                              <div key={section.animal} className="nav-mega-col">
                                <div className="nav-mega-heading">{section.heading}</div>
                                {section.links.map((link) => (
                                  <button
                                    key={`${section.animal}-${link.category}`}
                                    type="button"
                                    className="nav-mega-link"
                                    onClick={() => handleDropdownNav(section.animal, link.category)}
                                  >
                                    <ChevronRight size={12} />
                                    {link.label}
                                  </button>
                                ))}
                              </div>
                            ))}

                            {/* CTA column */}
                            <div className="nav-mega-cta-col">
                              <button
                                type="button"
                                className="nav-mega-cta-btn"
                                onClick={() => handleNav('nos-essentiels')}
                              >
                                <Sparkles size={14} />
                                Tous les produits
                              </button>
                              <p className="nav-mega-cta-sub">
                                Livraison offerte dès 49 €
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Regular nav link
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`cream-nav-link ${currentRoute === item.id ? 'active' : ''}`}
                    style={{ color: currentRoute === item.id ? '#FFAE01' : '#4E0000' }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right icons */}
            <div className="cream-header-actions">
              <button
                type="button"
                className="cream-icon-btn cream-desktop-only"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Rechercher"
              >
                <Search size={17} />
              </button>

              <button
                type="button"
                className="cream-icon-btn cream-desktop-only"
                onClick={() => handleNav('compte')}
                aria-label="Mon compte"
              >
                <User size={17} />
              </button>

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

              <button
                type="button"
                onClick={() => handleNav('admin')}
                className="cream-admin-pill cream-desktop-only"
                title="Admin"
              >
                <SlidersHorizontal size={13} />
                <span>Admin</span>
              </button>

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
                <PawPrint size={16} fill="#4E0000" color="#4E0000" />
              </div>
              <span>NÜMA</span>
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
              <span>Expédition depuis la France</span>
            </div>
            <div className="cream-drawer-badge-pill">
              <Package size={12} color="#FFAE01" />
              <span>Retours simplifiés · Stock en France</span>
            </div>
          </div>

          {/* ── Animal quick-select — mobile ── */}
          <div className="cream-drawer-section-label">Choisissez votre animal</div>
          <div className="cream-drawer-animal-pills">
            <button
              type="button"
              className="drawer-animal-pill"
              onClick={() => handleDropdownNav('dog', 'all')}
            >
              <span className="drawer-animal-emoji">🐕</span>
              <span>Pour mon chien</span>
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              className="drawer-animal-pill"
              onClick={() => handleDropdownNav('cat', 'all')}
            >
              <span className="drawer-animal-emoji">🐱</span>
              <span>Pour mon chat</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Section label */}
          <div className="cream-drawer-section-label">Navigation</div>

          {/* Nav links (without chien/chat) */}
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
              onClick={() => { setDrawerOpen(false); setIsCartOpen(true); }}
              className="cream-mobile-link"
            >
              <ShoppingBag size={14} color="#FFAE01" />
              <span>Mon panier ({cartCount})</span>
            </button>
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
              onClick={() => { setIsSearchOpen(true); setDrawerOpen(false); }}
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
              Voir toute la boutique
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
