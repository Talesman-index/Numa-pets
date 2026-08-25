import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';

const StoreContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'moki_products_v7',
  CART: 'moki_cart_v2',
  FAVORITES: 'moki_favs_v2',
  ORDERS: 'moki_orders_v2',
  SUBSCRIPTIONS: 'moki_subs_v2',
  USER: 'moki_user_v2',
  DISCOUNTS: 'moki_discounts_v2'
};

const DEFAULT_USER = {
  firstName: 'Sophie',
  lastName: 'Martin',
  email: 'sophie.martin@example.com',
  phone: '06 12 34 56 78',
  addresses: [
    {
      id: 'addr-1',
      title: 'Domicile',
      street: '14 Rue des Lilas',
      city: 'Lyon',
      zip: '69003',
      country: 'France',
      isDefault: true
    }
  ]
};

const DEFAULT_ORDERS = [
  {
    id: 'MOKI-84920',
    date: '10/02/2026',
    status: 'Livrée',
    statusTag: 'delivered',
    shippingMethod: 'Colissimo Domicile',
    trackingNumber: '6A184920489FR',
    trackingSteps: [
      { step: 'Commande confirmée', date: '10/02/2026 14:30', done: true },
      { step: 'Préparation en entrepôt', date: '11/02/2026 09:15', done: true },
      { step: 'Pris en charge transporteur', date: '11/02/2026 16:40', done: true },
      { step: 'Colis livré dans la boîte aux lettres', date: '13/02/2026 11:20', done: true }
    ],
    items: [
      {
        id: 'prod-dog-1',
        title: 'Harnais ergonomique Y-Confort',
        variant: 'Taille M - Kaki Sauvage',
        price: 39.90,
        quantity: 1,
        image: '/images/product-harness-khaki.png'
      },
      {
        id: 'prod-dog-2',
        title: 'Laisse multi-positions en sangle tressée',
        variant: 'Kaki Sauvage',
        price: 28.50,
        quantity: 1,
        image: '/images/product-leash-multiposition.png'
      }
    ],
    subtotal: 68.40,
    shippingFee: 0.00,
    total: 68.40
  }
];

const DEFAULT_SUBSCRIPTIONS = [
  {
    id: 'sub-101',
    productId: 'prod-dog-4',
    title: 'Baume protecteur & nourrissant coussinets',
    format: 'Stick pratique 50g',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    price: 13.40,
    frequency: 'Tous les 2 mois',
    nextDelivery: '10/04/2026',
    status: 'Actif'
  },
  {
    id: 'sub-102',
    productId: 'prod-dog-8',
    title: 'Distributeur compact + 80 sacs à déjections',
    format: 'Recharge 8 rouleaux (160 sacs)',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    price: 10.70,
    frequency: 'Chaque mois',
    nextDelivery: '15/03/2026',
    status: 'Actif'
  }
];

const DEFAULT_DISCOUNTS = [
  { code: 'MOKI10', type: 'percent', value: 10, minOrder: 0, description: '10% de réduction immédiate de bienvenue' },
  { code: 'MOKI20', type: 'percent', value: 20, minOrder: 60, description: '20% dès 60 € d’achat' },
  { code: 'LIVRAISON', type: 'free_shipping', value: 0, minOrder: 0, description: 'Frais de port offerts sans minimum' }
];

export const StoreProvider = ({ children }) => {
  // Always initialize products from fresh INITIAL_PRODUCTS to reflect code changes
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      // Merge initial products images & titles with any customized stock/price
      return INITIAL_PRODUCTS.map((initProd) => {
        const existing = parsed.find((p) => p.id === initProd.id);
        if (existing) {
          return {
            ...existing,
            title: initProd.title,
            subtitle: initProd.subtitle,
            images: initProd.images,
            categoryLabel: initProd.categoryLabel
          };
        }
        return initProd;
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return saved ? JSON.parse(saved) : ['prod-dog-1', 'prod-cat-2'];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  // Subscriptions
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
    return saved ? JSON.parse(saved) : DEFAULT_SUBSCRIPTIONS;
  });

  // User Profile
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  // Promo Discounts
  const [discounts, setDiscounts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISCOUNTS);
    return saved ? JSON.parse(saved) : DEFAULT_DISCOUNTS;
  });

  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Persistence to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISCOUNTS, JSON.stringify(discounts));
  }, [discounts]);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Methods
  const addToCart = (product, selectedVariants = {}, quantity = 1, isSubscription = false, frequency = null) => {
    setCart((prevCart) => {
      const itemKey = `${product.id}-${JSON.stringify(selectedVariants)}-${isSubscription ? frequency : 'single'}`;
      const existingItemIndex = prevCart.findIndex((item) => item.cartItemId === itemKey);

      const unitPrice = isSubscription && product.subscriptionPrice ? product.subscriptionPrice : product.price;

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        updated[existingItemIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevCart,
        {
          cartItemId: itemKey,
          id: product.id,
          title: product.title,
          slug: product.slug,
          price: unitPrice,
          originalPrice: product.price,
          image: product.images && product.images.length > 0 ? product.images[0] : (product.image || '/images/hero-golden-duo.jpg'),
          selectedVariants,
          quantity,
          isSubscription,
          subscriptionFrequency: frequency,
          stockQuantity: product.stockQuantity
        }
      ];
    });

    addToast(`"${product.title}" a été ajouté au panier !`, 'success');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    addToast('Article retiré du panier.');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites
  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Produit retiré de vos favoris.');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Produit ajouté à vos favoris !', 'success');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);

  // Discount Codes
  const applyDiscount = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = discounts.find((d) => d.code === cleanCode);

    if (!found) {
      addToast('Code promo invalide.', 'error');
      return { success: false, message: 'Code promo inexistant' };
    }

    if (found.minOrder && subtotal < found.minOrder) {
      addToast(`Ce code nécessite un panier minimum de ${found.minOrder} €.`, 'error');
      return { success: false, message: `Minimum ${found.minOrder} € requis` };
    }

    setAppliedDiscount(found);
    addToast(`Code ${found.code} appliqué (-${found.value}${found.type === 'percent' ? '%' : '€'}) !`, 'success');
    return { success: true, discount: found };
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    addToast('Code promo retiré.');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const discountAmount = appliedDiscount
    ? appliedDiscount.type === 'percent'
      ? (subtotal * appliedDiscount.value) / 100
      : appliedDiscount.type === 'fixed'
      ? appliedDiscount.value
      : 0
    : 0;

  // Free shipping over 49€ or if promo code is LIVRAISON
  const isFreeShipping = subtotal >= 49 || (appliedDiscount && appliedDiscount.type === 'free_shipping');
  const baseShippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : 4.90;

  const total = Math.max(0, subtotal - discountAmount + baseShippingFee);
  const freeShippingThresholdRemaining = Math.max(0, 49 - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / 49) * 100);

  // Order Placement
  const placeOrder = (orderData) => {
    const orderId = `MOKI-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'En préparation',
      statusTag: 'processing',
      shippingMethod: orderData.shippingMethod || 'Colissimo Domicile',
      trackingNumber: `6A${Math.floor(100000000 + Math.random() * 900000000)}FR`,
      trackingSteps: [
        { step: 'Commande confirmée', date: `${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`, done: true },
        { step: 'Préparation en cours à l\'entrepôt', date: 'En cours', done: true },
        { step: 'Pris en charge transporteur', date: 'À venir', done: false },
        { step: 'Livraison à domicile', date: 'Sous 24-48h', done: false }
      ],
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        variant: Object.values(item.selectedVariants).join(' - ') || 'Standard',
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      discountAmount,
      shippingFee: baseShippingFee,
      total,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress || orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod
    };

    // If order contains subscription items, create subscription records
    cart.forEach((item) => {
      if (item.isSubscription) {
        const newSub = {
          id: `sub-${Math.floor(1000 + Math.random() * 9000)}`,
          productId: item.id,
          title: item.title,
          format: Object.values(item.selectedVariants).join(' - ') || 'Standard',
          image: item.image,
          price: item.price,
          frequency: item.subscriptionFrequency || 'Tous les 2 mois',
          nextDelivery: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
          status: 'Actif'
        };
        setSubscriptions((prev) => [newSub, ...prev]);
      }
    });

    // Update stock levels in products
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const itemInCart = cart.find((c) => c.id === p.id);
        if (itemInCart) {
          return {
            ...p,
            stockQuantity: Math.max(0, p.stockQuantity - itemInCart.quantity)
          };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedDiscount(null);
    addToast(`Commande ${orderId} validée avec succès !`, 'success');
    return newOrder;
  };

  // Subscription Management
  const cancelSubscription = (subId) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Résilié' } : s))
    );
    addToast('Abonnement résilié sans frais.');
  };

  const pauseSubscription = (subId) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: s.status === 'En pause' ? 'Actif' : 'En pause' } : s))
    );
    addToast('Statut de l\'abonnement mis à jour.');
  };

  // Back-office Admin Methods
  const updateProductStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockQuantity: newStock, inStock: newStock > 0 } : p))
    );
    addToast('Stock mis à jour.');
  };

  const updateProductPrice = (productId, newPrice, newSubPrice) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              price: parseFloat(newPrice),
              subscriptionPrice: newSubPrice ? parseFloat(newSubPrice) : p.subscriptionPrice
            }
          : p
      )
    );
    addToast('Prix mis à jour.');
  };

  const updateOrderStatus = (orderId, newStatus, newStatusTag) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, statusTag: newStatusTag } : o))
    );
    addToast(`Statut de la commande ${orderId} mis à jour.`);
  };

  const addDiscountCode = (newDiscount) => {
    setDiscounts((prev) => [...prev, newDiscount]);
    addToast(`Code promo ${newDiscount.code} créé avec succès.`, 'success');
  };

  const deleteDiscountCode = (code) => {
    setDiscounts((prev) => prev.filter((d) => d.code !== code));
    addToast(`Code promo ${code} supprimé.`);
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    addToast('Profil mis à jour avec succès.', 'success');
  };

  const addProductReview = (productId, reviewData) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewData.author,
      rating: reviewData.rating || 5,
      date: new Date().toLocaleDateString('fr-FR'),
      title: reviewData.title || 'Avis vérifié',
      text: reviewData.text
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newRev, ...(p.reviews || [])];
          const newAvgRating = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...p,
            reviews: updatedReviews,
            rating: parseFloat(newAvgRating),
            reviewCount: (p.reviewCount || 0) + 1
          };
        }
        return p;
      })
    );

    addToast('Votre avis a été publié avec succès !', 'success');
  };

  // Helper to reset products cache to factory defaults
  const resetProductsToDefault = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    setProducts(INITIAL_PRODUCTS);
    addToast('Catalogue réinitialisé avec les images officielles.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        cart,
        cartCount,
        subtotal,
        discountAmount,
        appliedDiscount,
        baseShippingFee,
        isFreeShipping,
        total,
        freeShippingThresholdRemaining,
        freeShippingProgress,
        favorites,
        orders,
        subscriptions,
        user,
        discounts,
        isCartOpen,
        isSearchOpen,
        toasts,
        setIsCartOpen,
        setIsSearchOpen,
        addToast,
        showToast: addToast,
        removeToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleFavorite,
        isFavorite,
        applyDiscount,
        removeDiscount,
        placeOrder,
        cancelSubscription,
        pauseSubscription,
        updateProductStock,
        updateProductPrice,
        updateOrderStatus,
        addDiscountCode,
        deleteDiscountCode,
        updateUserProfile,
        addProductReview,
        resetProductsToDefault
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
