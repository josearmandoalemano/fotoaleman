import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Flipboard Promo */}
            <div className="sidebar-widget flipboard-widget">
                <h4 className="widget-title">FLIPBOARD REVISTA NÓMADA</h4>
                <div className="flipboard-content">
                    {/* Placeholder for Flipboard widget */}
                    <div style={{ background: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
                        Flipboard Widget Placeholder
                    </div>
                </div>
            </div>

            {/* Ad Widget */}
            <div className="sidebar-widget ad-widget">
                <div style={{ background: '#eee', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ANUNCIO
                </div>
            </div>

            {/* Latest News / More Content */}
            <div className="sidebar-widget latest-news">
                <h4 className="widget-title">ÚLTIMAS NOTICIAS</h4>
                <ul className="news-list">
                    <li>
                        <Link to="#">El renacimiento del turismo en Morelos...</Link>
                    </li>
                    <li>
                        <Link to="#">Nuevas rutas de senderismo en Tepoztlán...</Link>
                    </li>
                    <li>
                        <Link to="#">Gastronomía local: Los mejores tamales...</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
