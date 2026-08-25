import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { ToastContainer } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { DogPage } from './pages/DogPage';
import { CatPage } from './pages/CatPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { JournalPage } from './pages/JournalPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  // Navigation State with Hash router synchronization
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    return hash || 'accueil';
  });

  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        if (hash.startsWith('produit/')) {
          setCurrentRoute(`produit-${hash.replace('produit/', '')}`);
        } else if (hash.startsWith('article/')) {
          setCurrentRoute(`article-${hash.replace('article/', '')}`);
        } else {
          setCurrentRoute(hash);
        }
      } else {
        setCurrentRoute('accueil');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);

    if (route.startsWith('produit-')) {
      window.location.hash = `#/produit/${route.replace('produit-', '')}`;
    } else if (route.startsWith('article-')) {
      window.location.hash = `#/article/${route.replace('article-', '')}`;
    } else {
      window.location.hash = `#/${route}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    if (currentRoute.startsWith('produit-')) {
      const slug = currentRoute.replace('produit-', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentRoute.startsWith('article-')) {
      const slug = currentRoute.replace('article-', '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    switch (currentRoute) {
      case 'accueil':
        return <HomePage onNavigate={navigate} />;
      case 'chien':
        return <DogPage onNavigate={navigate} initialCategory={routeParams.category} />;
      case 'chat':
        return <CatPage onNavigate={navigate} initialCategory={routeParams.category} />;
      case 'nos-essentiels':
        return <CatalogPage onNavigate={navigate} filterParams={routeParams} />;
      case 'panier':
        return <CartPage onNavigate={navigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigate} />;
      case 'compte':
        return <AccountPage onNavigate={navigate} />;
      case 'conseils':
        return <JournalPage onNavigate={navigate} />;
      case 'a-propos':
        return <AboutPage onNavigate={navigate} />;
      case 'faq':
        return <FaqPage onNavigate={navigate} />;
      case 'suivi-commande':
        return <OrderTrackingPage trackingId={routeParams.trackingId} onNavigate={navigate} />;
      case 'admin':
        return <AdminPage onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isAdminView = currentRoute === 'admin';

  return (
    <>
      <Header currentRoute={currentRoute} onNavigate={navigate} />
      <main style={{ flexGrow: 1 }}>
        {renderCurrentPage()}
      </main>
      {!isAdminView && <Footer onNavigate={navigate} />}
      <CartDrawer onNavigate={navigate} />
      <SearchModal onNavigate={navigate} />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
