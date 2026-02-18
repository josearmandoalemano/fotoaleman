import React from 'react';
import { Link } from 'react-router-dom';

const TintaNomada = () => {
    return (
        <section className="tinta-nomada-section">
            <h2 className="section-header-title">TINTA NÓMADA</h2>
            <div className="tinta-content">
                <div className="tinta-main-article">
                    <img src="https://placehold.co/800x400" alt="Tinta Nomada Main" className="tinta-img" />
                    <div className="tinta-text">
                        <span className="rubric">Luis Cardenas</span>
                        <p>Los pueblos tradicionales de Tepoztlán, Morelos. Don Raúl Cárdenas (89 años + ofrenda) es el cronista de la Región Oriente de Morelos. Su cultura y media de su capital Cuernavaca y colindando con el estado de Puebla. Píquele en la curiosidad más pequeña del...</p>
                    </div>
                </div>
                <div className="tinta-sidebar-list">
                    <div className="tinta-mini-card">
                        <h4 className="mini-title">¿QUÉ ASÍ PUEDES DEJAR DE HACER HOY EN MORELOS?</h4>
                        <img src="https://placehold.co/150x100" alt="Mini 1" />
                    </div>
                    <div className="tinta-mini-card">
                        <h4 className="mini-title">ACTIVIDADES DE ARTE POPULAR EN MUSEO DE ARTE CUERNAVACA</h4>
                        <img src="https://placehold.co/150x100" alt="Mini 2" />
                    </div>
                    <div className="tinta-mini-card">
                        <h4 className="mini-title">COCINA PLANETA</h4>
                        <img src="https://placehold.co/150x100" alt="Mini 3" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TintaNomada;
