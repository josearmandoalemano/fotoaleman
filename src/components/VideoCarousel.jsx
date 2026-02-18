import React from 'react';
import './VideoCarousel.css';

import promoImg from '../assets/promo-banner.webp';
import { Link } from 'react-router-dom';

const CAROUSEL_ITEMS = [
    {
        type: 'image',
        id: 'promo-1',
        src: promoImg,
        link: '/article/1',
        alt: 'Descubre Tepoztlán'
    },
    { type: 'tiktok', id: "7512524030423993607", username: "luuz_ab15" },
    { type: 'tiktok', id: "7547810542451199246", username: "chunka.munka" },
    { type: 'tiktok', id: "7544887603745656082", username: "ruta.deportiva5" },
    { type: 'tiktok', id: "7565386635630726413", username: "chunka.munka" },
    { type: 'tiktok', id: "7489989037554453815", username: "jakemattte" },
    { type: 'tiktok', id: "7552696458789604615", username: "raziel.trek" },
    { type: 'tiktok', id: "7542315964554087688", username: "esen_alva" }
];

const VideoCarousel = () => {
    const scrollRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 350; // Approximates card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="video-carousel-section">
            <div className="video-carousel-header">
                <h2>Vive lo mejor de Morelos en TikTok</h2>
            </div>

            <div className="carousel-wrapper">
                <button className="carousel-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className="video-carousel-container" ref={scrollRef}>
                    {CAROUSEL_ITEMS.map((item) => (
                        <div key={item.id} className="video-card-embed">
                            {item.type === 'image' ? (
                                <Link to={item.link} className="carousel-image-link">
                                    <img src={item.src} alt={item.alt} className="carousel-image-content" />
                                </Link>
                            ) : (
                                <iframe
                                    src={`https://www.tiktok.com/embed/v2/${item.id}`}
                                    className="tiktok-embed-frame"
                                    allowFullScreen
                                    scrolling="no"
                                    title={`TikTok video by ${item.username}`}
                                ></iframe>
                            )}
                        </div>
                    ))}
                </div>

                <button className="carousel-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default VideoCarousel;
