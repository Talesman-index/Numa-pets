import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useStore } from '../context/StoreContext';
import { Search, Truck, CheckCircle2, Clock, Package, MapPin, AlertCircle } from 'lucide-react';

export const OrderTrackingPage = ({ trackingId, onNavigate }) => {
  const { orders } = useStore();
  const [query, setQuery] = useState(trackingId || 'MOKI-84920');
  const [searchedOrder, setSearchedOrder] = useState(() => {
    return orders.find((o) => o.id === (trackingId || 'MOKI-84920')) || orders[0] || null;
  });
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const clean = query.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === clean || o.trackingNumber?.toUpperCase() === clean
    );
    setSearchedOrder(found || null);
    setSearched(true);
  };

  return (
    <div className="section" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container-narrow">
        <Breadcrumbs items={[{ label: 'Suivi de commande' }]} onNavigate={onNavigate} />

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
            Expéditions en direct
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--color-brand-primary)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
            Suivre mon colis MOKI
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', maxWidth: 540, margin: '0 auto' }}>
            Indiquez votre numéro de commande (ex: MOKI-84920) pour visualiser les étapes d’acheminement en temps réel.
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: 500, margin: '0 auto var(--space-10)' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Numéro de commande (ex: MOKI-84920)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ fontSize: 'var(--text-sm)' }}
          />
          <button type="submit" className="btn btn-primary">
            <Search size={16} />
            <span>Rechercher</span>
          </button>
        </form>

        {/* Search Results */}
        {searched && (
          <div>
            {!searchedOrder ? (
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', textAlign: 'center' }}>
                <AlertCircle size={32} color="#EF4444" style={{ margin: '0 auto var(--space-2)' }} />
                <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                  Commande introuvable
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Vérifiez le numéro saisi dans votre email de confirmation. Pour toute assistance, contactez notre support client.
                </p>
              </div>
            ) : (
              <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)' }}>
                {/* Header Summary */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Commande</div>
                    <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800 }}>{searchedOrder.id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>N° Suivi Transporteur</div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{searchedOrder.trackingNumber || 'En cours d’attribution'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Transporteur</div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{searchedOrder.shippingMethod}</div>
                  </div>
                  <div>
                    <span className="badge badge-stock-in" style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
                      {searchedOrder.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Steps Timeline */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                    Étapes d’acheminement
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'relative', paddingLeft: 'var(--space-8)' }}>
                    <div style={{ position: 'absolute', left: 11, top: 8, bottom: 8, width: 2, backgroundColor: 'var(--color-border)' }} />

                    {searchedOrder.trackingSteps ? (
                      searchedOrder.trackingSteps.map((step, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <div
                            style={{
                              position: 'absolute',
                              left: -32,
                              top: 2,
                              width: 24,
                              height: 24,
                              borderRadius: 'var(--radius-full)',
                              backgroundColor: step.done ? '#D1FAE5' : 'var(--color-surface)',
                              border: `2px solid ${step.done ? '#10B981' : 'var(--color-border)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: step.done ? '#059669' : 'var(--color-text-muted)'
                            }}
                          >
                            {step.done ? <CheckCircle2 size={14} /> : <Clock size={12} />}
                          </div>
                          <div style={{ fontWeight: step.done ? 700 : 500, fontSize: 'var(--text-sm)', color: step.done ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                            {step.step}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{step.date}</div>
                        </div>
                      ))
                    ) : (
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Colis en cours de traitement logistique.</p>
                    )}
                  </div>
                </div>

                {/* Items in this parcel */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
                    Articles dans ce colis
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {searchedOrder.items.map((item, idx) => (
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
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
