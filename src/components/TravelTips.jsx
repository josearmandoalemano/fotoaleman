import React from 'react';
import { Link } from 'react-router-dom';

const TravelTips = () => {
    return (
        <section className="travel-tips-section">
            <h2 className="section-header-title">TIPS PARA EL VIAJERO</h2>
            <div className="tips-grid">
                <div className="tip-card">
                    <img src="https://placehold.co/400x300" alt="Tip 1" />
                    <span className="tip-rubric">VIAJE</span>
                    <h4>DISFRUTA LOS LUGARES MÁS ROMÁNTICOS DEL MUNDO</h4>
                    <p>Todos los días construimos para ti, el mejor sitio de viajes, ahora, déjanos ser parte de tus próximas...</p>
                </div>
                <div className="tip-card">
                    <img src="https://placehold.co/400x300" alt="Tip 2" />
                    <span className="tip-rubric">ESTILO</span>
                    <h4>CINCO TIPS QUE NO DEBES OLVIDAR SI VIAJAS</h4>
                    <p>No es lo mismo viajar por placer, de trabajo o con tu familia... sin embargo, para que lo puedas...</p>
                </div>
                <div className="tip-card">
                    <img src="https://placehold.co/400x300" alt="Tip 3" />
                    <span className="tip-rubric">MUNDO</span>
                    <h4>10 CONSEJOS PARA VIAJAR EN PAREJA</h4>
                    <p>Se acerca San Valentín y viajar con tu pareja suena a una de las mejores formas de celebrarlo. Por eso...</p>
                </div>
                <div className="tip-card">
                    <img src="https://placehold.co/400x300" alt="Tip 4" />
                    <span className="tip-rubric">VIDA</span>
                    <h4>3 PROPUESTAS ORIGINALES PARA IR DE VIAJE</h4>
                    <p>Te proponemos quizás una de mis ciudades más visitadas, seguramente no corresponderá de inmediato con...</p>
                </div>
            </div>
        </section>
    );
};

export default TravelTips;
