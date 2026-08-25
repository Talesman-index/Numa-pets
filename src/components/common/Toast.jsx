import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer = () => {
  const { toasts } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.type === 'success' && <CheckCircle2 size={18} color="#10B981" />}
          {toast.type === 'error' && <AlertCircle size={18} color="#EF4444" />}
          {toast.type === 'info' && <Info size={18} color="#60A5FA" />}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
