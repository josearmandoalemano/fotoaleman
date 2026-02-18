import React from 'react';
import { Link } from 'react-router-dom';

const PasaporteSection = () => {
    return (
        <section className="pasaporte-section">
            <h2 className="section-header-title">PASAPORTE</h2>
            <div className="pasaporte-grid">
                <div className="pasaporte-card">
                    <img src="https://placehold.co/600x400" alt="Bali Indonesia" className="pasaporte-img" />
                    <div className="pasaporte-overlay">
                        <h3>BALI INDONESIA</h3>
                    </div>
                </div>
                <div className="pasaporte-card">
                    <img src="https://placehold.co/600x400" alt="Por Siempre Paris" className="pasaporte-img" />
                    <div className="pasaporte-overlay">
                        <h3>POR SIEMPRE PARÍS</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PasaporteSection;
