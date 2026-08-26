import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ARTICLES } from '../data/articles';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Users,
  Tag,
  RefreshCw,
  FileText,
  Star,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export const AdminPage = ({ onNavigate }) => {
  const {
    products,
    orders,
    subscriptions,
    user,
    discounts,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminUpdateOrderStatus,
    adminAddDiscount,
    adminDeleteDiscount,
    showToast
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');

  // Product Edit / Add Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    subtitle: '',
    animal: 'dog',
    category: 'walk',
    categoryLabel: 'Promenade',
    price: 29.90,
    stockQuantity: 50,
    description: '',
    imagesInput: '/images/product-poop-bag-dispenser-1.png'
  });

  // Promo Code Add Form
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountForm, setDiscountForm] = useState({
    code: '',
    type: 'percent',
    value: 10,
    minOrder: 0,
    description: ''
  });

  // Stats KPIs calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stockQuantity < 30);
  const outOfStockProducts = products.filter((p) => p.stockQuantity === 0);

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      subtitle: '',
      animal: 'dog',
      category: 'walk',
      categoryLabel: 'Promenade',
      price: 29.90,
      stockQuantity: 50,
      description: 'Conçu avec soin pour le bien-être de votre animal.',
      imagesInput: '/images/product-poop-bag-dispenser-1.png'
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    const existingImages = Array.isArray(prod.images) ? prod.images.join(', ') : (prod.images || '');
    setProductForm({
      title: prod.title,
      subtitle: prod.subtitle,
      animal: prod.animal,
      category: prod.category,
      categoryLabel: prod.categoryLabel,
      price: prod.price,
      stockQuantity: prod.stockQuantity,
      description: prod.description || '',
      imagesInput: existingImages
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.title) {
      showToast('Le nom du produit est requis', 'error');
      return;
    }

    const parsedImages = productForm.imagesInput
      ? productForm.imagesInput.split(',').map((s) => s.trim()).filter(Boolean)
      : ['/images/hero-golden-duo.jpg'];

    const productPayload = {
      title: productForm.title,
      subtitle: productForm.subtitle,
      animal: productForm.animal,
      category: productForm.category,
      categoryLabel: productForm.categoryLabel,
      description: productForm.description,
      images: parsedImages.length > 0 ? parsedImages : ['/images/hero-golden-duo.jpg'],
      price: Number(productForm.price),
      stockQuantity: Number(productForm.stockQuantity)
    };

    if (editingProduct) {
      adminUpdateProduct({
        ...editingProduct,
        ...productPayload
      });
    } else {
      adminAddProduct(productPayload);
    }
    setShowProductModal(false);
  };

  const handleSaveDiscount = (e) => {
    e.preventDefault();
    if (!discountForm.code) {
      showToast('Veuillez renseigner le code', 'error');
      return;
    }
    adminAddDiscount({
      code: discountForm.code.trim().toUpperCase(),
      type: discountForm.type,
      value: Number(discountForm.value),
      minOrder: Number(discountForm.minOrder),
      description: discountForm.description || `Remise de ${discountForm.value}%`
    });
    setShowDiscountModal(false);
    setDiscountForm({ code: '', type: 'percent', value: 10, minOrder: 0, description: '' });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: 'calc(100vh - var(--header-height))' }}>
      {/* Top Admin Notice Bar */}
      <div style={{ backgroundColor: '#1E293B', color: '#F8FAFC', padding: 'var(--space-2) var(--space-6)', fontSize: 'var(--text-xs)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 'var(--radius-full)', backgroundColor: '#10B981', display: 'inline-block' }} />
          <strong>Administration NÜMA</strong> — Mode Gestion Directe Active
        </div>
        <button
          type="button"
          onClick={() => onNavigate('accueil')}
          style={{ color: '#94A3B8', textDecoration: 'underline' }}
        >
          ← Retour au site public
        </button>
      </div>

      <div className="admin-layout">
        {/* Admin Navigation Sidebar */}
        <aside className="admin-sidebar">
          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('orders')}
          >
            <Package size={18} />
            <span>Commandes ({orders.length})</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('products')}
          >
            <ShoppingBag size={18} />
            <span>Catalogue ({products.length})</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'stock' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('stock')}
          >
            <Layers size={18} />
            <span>Gestion Stock {lowStockProducts.length > 0 && <span className="badge badge-stock-low">{lowStockProducts.length}</span>}</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('customers')}
          >
            <Users size={18} />
            <span>Clients & Comptes</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'discounts' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('discounts')}
          >
            <Tag size={18} />
            <span>Promotions ({discounts.length})</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('subscriptions')}
          >
            <RefreshCw size={18} />
            <span>Abonnements ({subscriptions.length})</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('content')}
          >
            <FileText size={18} />
            <span>Contenu & Articles ({ARTICLES.length})</span>
          </button>

          <button
            type="button"
            className={`account-nav-btn ${activeAdminTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveAdminTab('reviews')}
          >
            <Star size={18} />
            <span>Avis Clients</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="admin-content">
          {/* TAB : DASHBOARD */}
          {activeAdminTab === 'dashboard' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Vue synthétique de l’activité NÜMA
              </h1>

              {/* KPI Cards */}
              <div className="admin-stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Chiffre d’affaires total</div>
                  <div className="stat-val">{totalRevenue.toFixed(2)} €</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendingUp size={13} /> Ventes directes NÜMA
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Commandes enregistrées</div>
                  <div className="stat-val">{orders.length}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Toutes traitées en France
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Références catalogue</div>
                  <div className="stat-val">{products.length}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Catalogue court & maîtrisé
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Abonnements récurrents</div>
                  <div className="stat-val">{subscriptions.length}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-emerald)', marginTop: '4px' }}>
                    Commandes automatiques
                  </div>
                </div>
              </div>

              {/* Recent Orders table */}
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Dernières commandes</h2>
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setActiveAdminTab('orders')}>
                    Voir toutes les commandes
                  </button>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Commande</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 700 }}>{o.id}</td>
                        <td>{o.customer?.firstName ? `${o.customer.firstName} ${o.customer.lastName}` : 'Sophie Martin'}</td>
                        <td>{o.date}</td>
                        <td style={{ fontWeight: 600 }}>{o.total.toFixed(2)} €</td>
                        <td>
                          <span className="badge badge-stock-in">{o.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : COMMANDES */}
          {activeAdminTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>Gestion des Commandes</h1>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID Commande</th>
                      <th>Client</th>
                      <th>Articles</th>
                      <th>Mode de livraison</th>
                      <th>Total</th>
                      <th>Statut & Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td style={{ fontWeight: 700 }}>{o.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>
                            {o.customer ? `${o.customer.firstName} ${o.customer.lastName}` : 'Client NÜMA'}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            {o.customer?.email || 'client@example.com'}
                          </div>
                        </td>
                        <td>{o.items.length} article(s)</td>
                        <td>{o.shippingMethod}</td>
                        <td style={{ fontWeight: 700 }}>{o.total.toFixed(2)} €</td>
                        <td>
                          <select
                            value={o.status}
                            onChange={(e) => adminUpdateOrderStatus(o.id, e.target.value)}
                            className="form-input"
                            style={{ width: 'auto', padding: '4px 8px', fontSize: 'var(--text-xs)', fontWeight: 600 }}
                          >
                            <option value="En préparation">En préparation</option>
                            <option value="Expédiée">Expédiée</option>
                            <option value="Livrée">Livrée</option>
                            <option value="Annulée">Annulée</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : PRODUITS */}
          {activeAdminTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>Catalogue Produits NÜMA ({products.length})</h1>
                <button type="button" className="btn btn-primary" onClick={handleOpenAddProduct}>
                  <Plus size={16} />
                  <span>Ajouter un produit</span>
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Univers</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <img src={p.images[0]} alt={p.title} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                            <div>
                              <div style={{ fontWeight: 600 }}>{p.title}</div>
                              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{p.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${p.animal === 'dog' ? 'badge-dog' : 'badge-cat'}`}>
                            {p.animal === 'dog' ? 'Chien' : 'Chat'}
                          </span>
                        </td>
                        <td>{p.categoryLabel}</td>
                        <td style={{ fontWeight: 700 }}>{p.price.toFixed(2)} €</td>
                        <td>
                          <span className={`badge ${p.stockQuantity > 20 ? 'badge-stock-in' : 'badge-stock-low'}`}>
                            {p.stockQuantity} en stock
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              onClick={() => handleOpenEditProduct(p)}
                              title="Modifier"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              onClick={() => adminDeleteProduct(p.id)}
                              style={{ color: '#EF4444' }}
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : STOCK */}
          {activeAdminTab === 'stock' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Gestion & Alertes de Stock
              </h1>

              {lowStockProducts.length > 0 && (
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4) var(--space-6)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: '#991B1B' }}>
                  <AlertTriangle size={20} />
                  <span>
                    <strong>{lowStockProducts.length} produit(s)</strong> ont un stock inférieur au seuil d'alerte (30 unités).
                  </span>
                </div>
              )}

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité disponible</th>
                      <th>Statut</th>
                      <th>Action Réapprovisionnement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td style={{ fontWeight: 600 }}>{p.title}</td>
                        <td style={{ fontWeight: 700 }}>{p.stockQuantity} unités</td>
                        <td>
                          <span className={`badge ${p.stockQuantity > 25 ? 'badge-stock-in' : 'badge-stock-low'}`}>
                            {p.stockQuantity > 25 ? 'Stock normal' : 'Stock bas'}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              adminUpdateProduct({
                                ...p,
                                stockQuantity: p.stockQuantity + 50
                              });
                            }}
                          >
                            + Réapprovisionner (+50)
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : CLIENTS */}
          {activeAdminTab === 'customers' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Comptes Clients
              </h1>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nom & Prénom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Commandes</th>
                      <th>Adresse principale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{orders.length} commande(s)</td>
                      <td>{user.addresses[0]?.street}, {user.addresses[0]?.city}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : PROMOTIONS */}
          {activeAdminTab === 'discounts' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800 }}>Codes Promo & Réductions</h1>
                <button type="button" className="btn btn-primary" onClick={() => setShowDiscountModal(true)}>
                  <Plus size={16} />
                  <span>Créer un code promo</span>
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Type de remise</th>
                      <th>Valeur</th>
                      <th>Minimum de commande</th>
                      <th>Description</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {discounts.map((d) => (
                      <tr key={d.code}>
                        <td style={{ fontWeight: 800, color: 'var(--color-brand-primary)' }}>{d.code}</td>
                        <td>{d.type === 'percent' ? 'Pourcentage' : 'Frais de port'}</td>
                        <td style={{ fontWeight: 600 }}>{d.type === 'percent' ? `-${d.value}%` : 'Offert'}</td>
                        <td>{d.minOrder > 0 ? `${d.minOrder} €` : 'Aucun'}</td>
                        <td>{d.description}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => adminDeleteDiscount(d.code)}
                            style={{ color: '#EF4444' }}
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : ABONNEMENTS */}
          {activeAdminTab === 'subscriptions' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Commandes Récurrentes & Abonnements
              </h1>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Produit</th>
                      <th>Fréquence</th>
                      <th>Prochaine livraison</th>
                      <th>Prix récurrent</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 700 }}>{s.id}</td>
                        <td>{s.title}</td>
                        <td>{s.frequency}</td>
                        <td>{s.nextDelivery}</td>
                        <td style={{ fontWeight: 700, color: 'var(--color-accent-emerald)' }}>{s.price.toFixed(2)} €</td>
                        <td>
                          <span className={`badge ${s.status === 'Actif' ? 'badge-stock-in' : 'badge-stock-low'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : CONTENU */}
          {activeAdminTab === 'content' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Articles du Journal NÜMA
              </h1>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Thématique</th>
                      <th>Date</th>
                      <th>Temps de lecture</th>
                      <th>Produits associés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ARTICLES.map((art) => (
                      <tr key={art.id}>
                        <td style={{ fontWeight: 600 }}>{art.title}</td>
                        <td>
                          <span className={`badge ${art.categoryTag === 'dog' ? 'badge-dog' : 'badge-cat'}`}>
                            {art.category}
                          </span>
                        </td>
                        <td>{art.date}</td>
                        <td>{art.readTime}</td>
                        <td>{art.relatedProductIds?.length || 0} produit(s) lié(s)</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB : AVIS */}
          {activeAdminTab === 'reviews' && (
            <div>
              <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
                Modération des Avis Clients
              </h1>

              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                  Tous les avis publiés sont automatiquement synchronisés avec les fiches produits.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {products.flatMap((p) => (p.reviews || []).map((r) => ({ ...r, productTitle: p.title }))).map((rev) => (
                    <div key={rev.id} style={{ border: '1px solid var(--color-border-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
                        <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{rev.author} — {rev.productTitle}</span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{rev.date}</span>
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-amber)', marginBottom: 'var(--space-1)' }}>
                        {'★'.repeat(rev.rating)} ({rev.rating}/5)
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Add/Edit Product */}
      {showProductModal && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 580, padding: 'var(--space-6)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              {editingProduct ? `Modifier ${editingProduct.title}` : 'Ajouter un nouveau produit'}
            </h3>

            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label className="form-label">Nom du produit</label>
                <input
                  type="text"
                  className="form-input"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sous-titre / Courte description</label>
                <input
                  type="text"
                  className="form-input"
                  value={productForm.subtitle}
                  onChange={(e) => setProductForm({ ...productForm, subtitle: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Univers animal</label>
                  <select
                    className="form-input"
                    value={productForm.animal}
                    onChange={(e) => setProductForm({ ...productForm, animal: e.target.value })}
                  >
                    <option value="dog">Chien</option>
                    <option value="cat">Chat</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Catégorie</label>
                  <select
                    className="form-input"
                    value={productForm.category}
                    onChange={(e) => {
                      const labels = {
                        walk: 'Promenade',
                        care: 'Soin & Hygiène',
                        hygiene: 'Soin & Hygiène',
                        play: 'Jeu',
                        comfort: 'Confort'
                      };
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        categoryLabel: labels[e.target.value] || 'Accessoires'
                      });
                    }}
                  >
                    <option value="walk">Promenade</option>
                    <option value="care">Soin</option>
                    <option value="hygiene">Hygiène</option>
                    <option value="play">Jeu</option>
                    <option value="comfort">Confort</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Prix (€ TTC)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-input"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock initial</label>
                  <input
                    type="number"
                    className="form-input"
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Images du produit (chemins ou URLs séparés par des virgules)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="/images/product-poop-bag-dispenser-1.png, /images/product-poop-bag-dispenser-2.jpg"
                  value={productForm.imagesInput}
                  onChange={(e) => setProductForm({ ...productForm, imagesInput: e.target.value })}
                />
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px', display: 'block' }}>
                  Exemple : <code>/images/product-poop-bag-dispenser-1.png</code> ou une URL web Unsplash.
                </span>

                {/* Live Preview */}
                {productForm.imagesInput && (
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {productForm.imagesInput
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((imgSrc, idx) => (
                        <div key={idx} style={{ position: 'relative', width: 48, height: 48, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                          <img
                            src={imgSrc}
                            alt="Aperçu"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/images/hero-golden-duo.jpg'; }}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description détaillée</label>
                <textarea
                  className="form-input"
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowProductModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Discount */}
      {showDiscountModal && (
        <div className="modal-overlay" onClick={() => setShowDiscountModal(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440, padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
              Nouveau Code Promotionnel
            </h3>

            <form onSubmit={handleSaveDiscount}>
              <div className="form-group">
                <label className="form-label">Code Promo (ex: PROMO15)</label>
                <input
                  type="text"
                  className="form-input"
                  value={discountForm.code}
                  onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    className="form-input"
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}
                  >
                    <option value="percent">Pourcentage (%)</option>
                    <option value="free_shipping">Livraison offerte</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Valeur (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Panier minimum (€)</label>
                <input
                  type="number"
                  className="form-input"
                  value={discountForm.minOrder}
                  onChange={(e) => setDiscountForm({ ...discountForm, minOrder: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDiscountModal(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Créer le code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
