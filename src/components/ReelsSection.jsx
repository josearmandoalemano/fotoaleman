import React, { useRef } from 'react';
import './ReelsSection.css';

// Placeholder data since we cannot scrape live Instagram Reel IDs.
// User should replace the 'link' with the specific reel URL if they have it.
const REELS_DATA = [
    // RED BULL (Extreme Sports / Adventure)
    {
        id: 'rb-1',
        source: 'Red Bull',
        title: 'Desafiando la gravedad: Salto base desde las alturas.',
        image: 'https://loremflickr.com/400/700/extreme,sports?lock=100',
        link: 'https://www.instagram.com/redbull/reels/'
    },
    {
        id: 'rb-2',
        source: 'Red Bull',
        title: 'Velocidad pura en la pista de F1.',
        image: 'https://loremflickr.com/400/700/f1,racing?lock=101',
        link: 'https://www.instagram.com/redbull/reels/'
    },
    {
        id: 'rb-3',
        source: 'Red Bull',
        title: 'Surf en las olas gigantes de Nazaré.',
        image: 'https://loremflickr.com/400/700/surfing,waves?lock=102',
        link: 'https://www.instagram.com/redbull/reels/'
    },
    {
        id: 'rb-4',
        source: 'Red Bull',
        title: 'BMX Freestyle: Trucos imposibles en la ciudad.',
        image: 'https://loremflickr.com/400/700/bmx,stunt?lock=103',
        link: 'https://www.instagram.com/redbull/reels/'
    },
    // NAT GEO (Nature / Wildlife)
    {
        id: 'ng-1',
        source: 'Nat Geo',
        title: 'Los secretos del océano profundo revelados.',
        image: 'https://loremflickr.com/400/700/underwater,ocean?lock=200',
        link: 'https://www.instagram.com/natgeo/reels/'
    },
    {
        id: 'ng-2',
        source: 'Nat Geo',
        title: 'Vida salvaje en el Serengeti: La gran migración.',
        image: 'https://loremflickr.com/400/700/wildlife,lion?lock=201',
        link: 'https://www.instagram.com/natgeo/reels/'
    },
    {
        id: 'ng-3',
        source: 'Nat Geo',
        title: 'Expedición al Ártico: Testigos del cambio climático.',
        image: 'https://loremflickr.com/400/700/iceberg,arctic?lock=202',
        link: 'https://www.instagram.com/natgeo/reels/'
    },
    {
        id: 'ng-4',
        source: 'Nat Geo',
        title: 'Maravillas microscópicas: Un mundo invisible.',
        image: 'https://loremflickr.com/400/700/microscope,nature?lock=203',
        link: 'https://www.instagram.com/natgeo/reels/'
    }
];

const ReelsSection = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Adjust scroll amount
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="container reels-section">
            <div className="section-header-row">
                <h2 className="section-title">NÓMADAS EN ACCIÓN</h2>
            </div>

            <div className="reels-carousel-wrapper">
                <button className="carousel-arrow left" onClick={() => scroll('left')} aria-label="Scroll left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <div className="reels-carousel-container" ref={scrollRef}>
                    {REELS_DATA.map((reel) => (
                        <a
                            key={reel.id}
                            href={reel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reel-card"
                        >
                            <img
                                src={reel.image}
                                alt={reel.title}
                                className="reel-image"
                            />
                            <div className="reel-overlay">
                                <span className="reel-source">
                                    {reel.source}
                                </span>
                                <p className="reel-title">
                                    {reel.title}
                                </p>
                            </div>
                            <div className="play-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                <button className="carousel-arrow right" onClick={() => scroll('right')} aria-label="Scroll right">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default ReelsSection;
