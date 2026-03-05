import React, { createContext, useState, useContext } from 'react';
import { Icons } from '../utils/Icons';

type ShowToastFn = (message: string, type?: string) => void;
const ToastContext = createContext<ShowToastFn>(() => { });
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    right: '40px',
                    background: toast.type === 'success' ? '#10b981' : 'var(--color-text-red)',
                    color: 'white',
                    padding: '16px 24px',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontWeight: 600,
                    zIndex: 1000,
                    animation: 'slideUpFade 0.3s ease-out forwards'
                }}>
                    {toast.type === 'success' ? <Icons.CheckCircle /> : <Icons.AlertTriangle />}
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
};
