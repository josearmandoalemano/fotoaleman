import React, { useRef, useState } from 'react';
import './ExperienceVideoCarousel.css';

const VIDEOS = [
    { id: 1, src: '/videos/car1.mp4#t=0.001', title: 'La Catedral', poster: '' },
    { id: 3, src: '/videos/car3.mp4#t=0.001', title: 'Jardin Borda', poster: '' },
    { id: 4, src: '/videos/temixco-reel-1.mp4', title: 'Ex Hacienda de Temixco', poster: '/videos/temixco-cover-1.jpg' },
    { id: 5, src: '/videos/temixco-reel-2.mp4', title: 'Ex Hacienda de Temixco', poster: '/videos/temixco-cover-2.jpg' },
    { id: 6, src: '/videos/reel-muaic-3.mp4', title: 'Museo MUAIC', poster: '' },
];

const ExperienceVideoCarousel = () => {
    const scrollRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 280; // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleVideoClick = (id) => {
        if (playingId === id) {
            setPlayingId(null);
        } else {
            setPlayingId(id);
        }
    };

    return (
        <section className="experience-video-section">
            <div className="container">
                <div className="video-carousel-header">
                    <h2 className="section-title">Historias en movimiento</h2>
                </div>

                <div className="video-carousel-wrapper">
                    <button className="nav-btn prev" onClick={() => scroll('left')} aria-label="Anterior">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <div className="video-carousel-track" ref={scrollRef}>
                        {VIDEOS.map((video) => (
                            <div
                                key={video.id}
                                className={`video-card ${playingId === video.id ? 'is-playing' : ''}`}
                                onClick={() => handleVideoClick(video.id)}
                            >
                                <div className="video-wrapper">
                                    <video
                                        src={video.src}
                                        poster={video.poster}
                                        loop
                                        playsInline
                                        muted={playingId !== video.id}
                                        autoPlay={playingId === video.id}
                                        type="video/mp4"
                                        preload="metadata"
                                        ref={(el) => {
                                            if (el) {
                                                if (playingId === video.id) {
                                                    el.muted = false;
                                                    el.play().catch(err => console.error("Video play failed:", err));
                                                } else {
                                                    el.pause();
                                                    el.muted = true;
                                                }
                                            }
                                        }}
                                    />
                                    {!playingId && (
                                        <div className="video-play-hint">
                                            <div className="play-icon-circle">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="video-info-overlay">
                                        <h3>{video.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="nav-btn next" onClick={() => scroll('right')} aria-label="Siguiente">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ExperienceVideoCarousel;
