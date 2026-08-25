import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/common/ProductCard';
import {
  Package,
  RefreshCw,
  Heart,
  MapPin,
  User,
  LogOut,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AccountPage = ({ onNavigate }) => {
  const {
    user,
    orders,
    subscriptions,
    updateSubscriptionFrequency,
    toggleSubscriptionStatus,
    cancelSubscription,
    favorites,
    products,
    addAddress,
    deleteAddress,
    updateUserInfo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders');

  // Address modal form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: 'Domicile',
    street: '',
    city: '',
    zip: '',
    country: 'France'
  });

  // User Info form
  const [userInfoForm, setUserInfoForm] = useState({
    firstName: user.firstName || 'Sophie',
    lastName: user.lastName || 'Martin',
    email: user.email || 'sophie.martin@example.com',
    phone: user.phone || '06 12 34 56 78'
  });

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleSaveUserInfo = (e) => {
    e.preventDefault();
    updateUserInfo(userInfoForm);
  };

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city || !newAddr.zip) {
      showToast('Veuillez renseigner tous les champs obligatoires', 'error');
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({ title: 'Domicile', street: '', city: '', zip: '', country: 'France' });
  };

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Mon Compte' }]} onNavigate={onNavigate} />

        {/* User Welcome Banner */}
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)', marginBottom: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
              Espace Membre MOKI
            </span>
            <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginTop: 'var(--space-1)' }}>
              Bonjour, {user.firstName}
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {user.email} • Membre actif depuis 2026
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('nos-essentiels')}
            >
              Commander un essentiel
            </button>
          </div>
        </div>

        {/* Account Layout */}
        <div className="account-layout">
          {/* Sidebar Navigation */}
          <div className="account-nav">
            <button
              type="button"
              className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} />
              <span>Mes commandes ({orders.length})</span>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === 'subscriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscriptions')}
            >
              <RefreshCw size={18} />
              <span>Mes abonnements ({subscriptions.length})</span>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={18} />
              <span>Mes favoris ({favoriteProducts.length})</span>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} />
              <span>Mes adresses ({user.addresses.length})</span>
            </button>

            <button
              type="button"
              className={`account-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} />
              <span>Mes informations</span>
            </button>

            <button
              type="button"
              className="account-nav-btn"
              onClick={() => showToast('Session déconnectée', 'info')}
              style={{ color: '#EF4444', marginTop: 'var(--space-4)' }}
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Main Tab Content */}
          <div>
            {/* TAB 1: Mes commandes */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                  Historique de vos commandes
                </h2>

                {orders.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', textAlign: 'center' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      Vous n’avez pas encore passé de commande.
                    </p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate('nos-essentiels')}>
                      Découvrir la boutique
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-6)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                          <div>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Commande #{order.id}</div>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Passée le {order.date}</div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <span className="badge badge-stock-in" style={{ padding: '4px 8px' }}>
                              {order.status}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              onClick={() => onNavigate('suivi-commande', { trackingId: order.id })}
                            >
                              <Truck size={14} />
                              <span>Suivre</span>
                            </button>
                          </div>
                        </div>

                        {/* Items list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <img src={item.image} alt={item.title} style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                <div>
                                  <div style={{ fontWeight: 600 }}>{item.title}</div>
                                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                                    {item.variant} • Qté: {item.quantity}
                                  </div>
                                </div>
                              </div>
                              <div style={{ fontWeight: 700 }}>{(item.price * item.quantity).toFixed(2)} €</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>Mode : {order.shippingMethod}</span>
                          <span style={{ fontWeight: 800 }}>Total : {order.total.toFixed(2)} €</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Mes abonnements */}
            {activeTab === 'subscriptions' && (
              <div>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                  Mes livraisons automatiques
                </h2>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  Gérez vos réapprovisionnements récurrents avec -10% de réduction permanente.
                </p>

                {subscriptions.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', textAlign: 'center' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      Vous n’avez aucun abonnement actif pour le moment.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => onNavigate('nos-essentiels', { recurringOnly: true })}
                    >
                      Découvrir les produits récurrents
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {subscriptions.map((sub) => (
                      <div
                        key={sub.id}
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-lg)',
                          padding: 'var(--space-6)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                            <img src={sub.image} alt={sub.title} style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700 }}>{sub.title}</h3>
                                <span className={`badge ${sub.status === 'Actif' ? 'badge-stock-in' : 'badge-stock-low'}`}>
                                  {sub.status}
                                </span>
                              </div>
                              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{sub.format}</div>
                              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-accent-emerald)', marginTop: '2px' }}>
                                {sub.price.toFixed(2)} € / envoi (-10%)
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Prochaine livraison</div>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={14} /> {sub.nextDelivery}
                            </div>
                          </div>
                        </div>

                        {/* Subscription Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                            <span style={{ fontWeight: 600 }}>Fréquence :</span>
                            <select
                              value={sub.frequency}
                              onChange={(e) => updateSubscriptionFrequency(sub.id, e.target.value)}
                              className="form-input"
                              style={{ width: 'auto', padding: '4px 8px', fontSize: 'var(--text-xs)' }}
                            >
                              <option value="Chaque mois">Chaque mois</option>
                              <option value="Tous les 2 mois">Tous les 2 mois</option>
                              <option value="Tous les 3 mois">Tous les 3 mois</option>
                            </select>
                          </div>

                          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => toggleSubscriptionStatus(sub.id)}
                            >
                              {sub.status === 'Actif' ? 'Mettre en pause' : 'Réactiver'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              onClick={() => cancelSubscription(sub.id)}
                              style={{ color: '#EF4444' }}
                            >
                              Résilier
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Mes favoris */}
            {activeTab === 'favorites' && (
              <div>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                  Mes articles favoris
                </h2>

                {favoriteProducts.length === 0 ? (
                  <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', textAlign: 'center' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
                      Vous n’avez aucun coup de cœur enregistré pour l’instant.
                    </p>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate('nos-essentiels')}>
                      Découvrir la sélection
                    </button>
                  </div>
                ) : (
                  <div className="products-grid">
                    {favoriteProducts.map((p) => (
                      <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Mes adresses */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
                    Mes adresses de livraison
                  </h2>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowAddressModal(true)}
                  >
                    <Plus size={16} />
                    <span>Ajouter une adresse</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
                  {user.addresses.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                          <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{addr.title}</span>
                          {addr.isDefault && (
                            <span className="badge badge-bestseller">Par défaut</span>
                          )}
                        </div>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                          {addr.street}<br />
                          {addr.zip} {addr.city}<br />
                          {addr.country}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-3)' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => deleteAddress(addr.id)}
                          style={{ color: '#EF4444' }}
                        >
                          <Trash2 size={14} />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Add Address */}
                {showAddressModal && (
                  <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480, padding: 'var(--space-6)' }}>
                      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                        Ajouter une nouvelle adresse
                      </h3>
                      <form onSubmit={handleCreateAddress}>
                        <div className="form-group">
                          <label className="form-label">Libellé (ex: Domicile, Bureau)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={newAddr.title}
                            onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Adresse (Numéro et voie)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={newAddr.street}
                            onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-row-2">
                          <div className="form-group">
                            <label className="form-label">Ville</label>
                            <input
                              type="text"
                              className="form-input"
                              value={newAddr.city}
                              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Code Postal</label>
                            <input
                              type="text"
                              className="form-input"
                              value={newAddr.zip}
                              onChange={(e) => setNewAddr({ ...newAddr, zip: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowAddressModal(false)}
                          >
                            Annuler
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Enregistrer l’adresse
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: Mes informations */}
            {activeTab === 'profile' && (
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', maxWidth: 540 }}>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>
                  Informations personnelles
                </h2>

                <form onSubmit={handleSaveUserInfo}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-input"
                        value={userInfoForm.firstName}
                        onChange={(e) => setUserInfoForm({ ...userInfoForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-input"
                        value={userInfoForm.lastName}
                        onChange={(e) => setUserInfoForm({ ...userInfoForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Adresse email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={userInfoForm.email}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Numéro de téléphone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={userInfoForm.phone}
                      onChange={(e) => setUserInfoForm({ ...userInfoForm, phone: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                    Enregistrer les modifications
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
