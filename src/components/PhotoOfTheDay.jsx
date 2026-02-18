import React from 'react';
import './PhotoOfTheDay.css';
import photoImg from '../assets/photo_of_day.png';

const PhotoOfTheDay = () => {
    return (
        <section className="photo-of-the-day-section">
            <div className="container">
                <h2 className="section-title-mod" style={{
                    marginBottom: '20px',
                    fontSize: '1.5rem',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: '700',
                    borderLeft: '4px solid var(--color-primary)',
                    paddingLeft: '15px',
                    textTransform: 'uppercase'
                }}>
                    | LA FOTO DEL DÍA
                </h2>
                <div className="photo-container">
                    <img src={photoImg} alt="Foto del día" className="photo-main" />
                    <div className="photo-label">Foto: José Alemán &nbsp;&nbsp; Locación: Museo del Prado, Madrid.</div>
                </div>
            </div>
        </section>
    );
};

export default PhotoOfTheDay;
