
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './SubscriptionModal.css';

const SubscriptionModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const { data, error } = await supabase.functions.invoke('subscribe', {
                body: { email }
            });

            if (error) throw error;

            if (data && data.error) {
                setStatus('error');
                setMessage(data.error);
            } else {
                setStatus('success');
                setMessage('¡Gracias por suscribirte!');
                setEmail('');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setMessage('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            setStatus('error');
            setMessage('Hubo un error. Intenta nuevamente.');
        }
    };

    return (
        <div className="subscription-modal-overlay" onClick={onClose}>
            <div className="subscription-modal-content" onClick={e => e.stopPropagation()}>
                <button className="subscription-modal-close" onClick={onClose}>&times;</button>

                <h2 className="subscription-modal-title">Suscríbete a Visita Morelos</h2>
                <p className="subscription-modal-subtitle">
                    Recibe las mejores historias, guías y secretos de Morelos directamente en tu correo.
                </p>

                {status === 'success' ? (
                    <div className="subscription-success-message">
                        <span className="success-icon">✓</span>
                        <p>{message}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="subscription-form">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="subscription-input"
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className="subscription-submit-button"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Suscribiendo...' : 'Suscribirse'}
                        </button>
                    </form>
                )}

                {status === 'error' && <p className="subscription-error-message">{message}</p>}

                <p className="subscription-privacy-note">
                    Respetamos tu privacidad. Sin spam, solo contenido de calidad.
                </p>
            </div>
        </div>
    );
};

export default SubscriptionModal;
