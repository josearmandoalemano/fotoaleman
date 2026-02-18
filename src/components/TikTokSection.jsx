import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VideoCard = ({ videoSrc, title }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div
            className="tiktok-card"
            style={{
                position: 'relative',
                height: '100%',
                background: '#000',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '9/16',
                cursor: 'pointer'
            }}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px'
                }}
                loop
                playsInline
            />

            {!isPlaying && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        border: '2px solid white'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding: '20px 10px 10px',
                color: 'white',
                pointerEvents: 'none'
            }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {title}
                </p>
            </div>
        </div>
    );
};

const TikTokSection = () => {
    const localVideos = [
        { id: 1, src: '/videos/tiktok-1.mp4', title: '@franciscoacosta1989' },
        { id: 2, src: '/videos/tiktok-2.mp4', title: '@yahayradominguez' },
        { id: 3, src: '/videos/tiktok-3.mp4', title: '@ariii_j5' },
        { id: 4, src: '/videos/tiktok-4.mp4', title: '@santiago.rosas42' },
        { id: 5, src: '/videos/tiktok-5.mp4', title: '@hola.soyandy' },
        { id: 6, src: '/videos/tiktok-6.mp4', title: '@pguerreroa777' },
        { id: 7, src: '/videos/tiktok-7.mp4', title: '@conocemasdemexicoia' },
        { id: 8, src: '/videos/tiktok-8.mp4', title: '@abdielk_23h' },
    ];

    return (
        <section className="container tiktok-section" style={{ marginBottom: '60px' }}>
            <div className="section-header-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', justifyContent: 'center' }}>
                <h2 className="section-title" style={{
                    marginBottom: 0,
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    borderLeft: 'none',
                    paddingLeft: 0,
                    color: 'var(--color-primary)'
                }}>
                    VIVE LOS MEJORES VIDEOS DE TIK TOK DE MORELOS
                </h2>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2.2, centeredSlides: false },
                    900: { slidesPerView: 3.2, centeredSlides: false },
                    1200: { slidesPerView: 4, centeredSlides: false }
                }}
                className="tiktok-swiper"
                style={{
                    paddingBottom: '40px',
                    '--swiper-navigation-color': 'var(--color-primary)',
                    '--swiper-pagination-color': 'var(--color-primary)'
                }}
            >
                {localVideos.map((video) => (
                    <SwiperSlide key={video.id} style={{ height: 'auto' }}>
                        <VideoCard videoSrc={video.src} title={video.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default TikTokSection;
