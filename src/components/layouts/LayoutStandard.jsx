import React, { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './ArticleLayouts.css';

// Simple FadeIn Component
const FadeIn = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 1s ease-out ${delay}ms`
            }}
            className={className}
        >
            {children}
        </div>
    );
};

const LayoutStandard = ({ article }) => {
    return (
        <div className="layout-standard">

            {/* Hero Section */}
            <div className="standard-hero">
                <div className="standard-hero-image-side">
                    {article.covers && article.covers.length > 1 ? (
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {article.covers.map((cover, index) => (
                                <SwiperSlide key={index}>
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <img
                                            src={cover}
                                            alt={`${article.title} - Cover ${index + 1}`}
                                            className="standard-hero-main-img"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                maxWidth: 'none',
                                                maxHeight: 'none',
                                                borderRadius: '0',
                                                border: 'none',
                                                boxShadow: 'none'
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: '0',
                                                width: '100%',
                                                height: '30%',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                                zIndex: 3
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <>
                            <img src={article.image} alt={article.title} className="standard-hero-main-img" />
                            <img src={article.image} alt="" className="standard-hero-blur-bg" aria-hidden="true" />
                        </>
                    )}
                </div>
                <div className="standard-hero-overlay">
                    <FadeIn>
                        <div className="standard-meta">
                            <span className="standard-rubric">{article.rubric || "Artículo"}</span>
                        </div>
                        <h1 className="standard-title">
                            {article.title}
                        </h1>
                        {article.author && (
                            <p style={{
                                fontSize: '1.1rem',
                                marginTop: '1rem',
                                marginBottom: '0',
                                color: '#666',
                                fontFamily: 'var(--font-serif)',
                                fontStyle: 'italic'
                            }}>
                                Por: {article.author}
                            </p>
                        )}
                    </FadeIn>
                </div>
            </div>

            <div className="standard-container">

                {/* Main Content */}
                <div className="standard-main">
                    <FadeIn delay={200}>
                        <p className="standard-lead">
                            {article.subtitle}
                        </p>
                    </FadeIn>

                    <FadeIn delay={400}>
                        <div
                            className="standard-body"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </FadeIn>
                </div>

                {/* Sidebar */}
                <div className="standard-sidebar">
                    <FadeIn delay={300}>
                        <div className="standard-sidebar-box">
                            <h3 className="standard-sidebar-title">Recomendaciones</h3>
                            <ul className="standard-facts">
                                {article.tags && article.tags.map(tag => (
                                    <li key={tag}>{tag}</li>
                                ))}
                                <li>Por {article.author}</li>
                            </ul>
                        </div>
                    </FadeIn>

                    {article.price && (
                        <FadeIn delay={400}>
                            {article.bookingUrl ? (
                                <a href={article.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                                    <div className="standard-sidebar-box hover:scale-105 transition-transform duration-300" style={{ marginTop: '1.5rem', backgroundColor: '#f9f5f0', borderLeft: '4px solid var(--color-dorado)', cursor: 'pointer' }}>
                                        <h3 className="standard-sidebar-title" style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                                            {article.price.split(':')[0]}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-sans)',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            color: '#333',
                                            margin: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {article.price.split(':')[1] ? article.price.split(':')[1].trim() : article.price}
                                            <span style={{ fontSize: '1rem', color: 'var(--color-dorado)' }}>➔</span>
                                        </p>
                                    </div>
                                </a>
                            ) : (
                                <div className="standard-sidebar-box" style={{ marginTop: '1.5rem', backgroundColor: '#f9f5f0', borderLeft: '4px solid var(--color-dorado)' }}>
                                    <h3 className="standard-sidebar-title" style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                                        {article.price.split(':')[0]}
                                    </h3>
                                    <p style={{
                                        fontFamily: 'var(--font-sans)',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        margin: 0
                                    }}>
                                        {article.price.split(':')[1] ? article.price.split(':')[1].trim() : article.price}
                                    </p>
                                </div>
                            )}
                        </FadeIn>
                    )}

                    <FadeIn delay={500}>
                        <div style={{ textAlign: 'center', padding: '2.5rem 0', borderTop: '2px solid #eee', borderBottom: '2px solid #eee', marginTop: '2rem' }}>
                            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#444', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                                {article.id === 4 ? 'UBICACIÓN' : 'Redes Sociales'}
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', color: 'var(--color-dorado)', marginBottom: '1.5rem' }}>
                                {article.facebookUrl && (
                                    <a href={article.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'transform 0.3s' }} className="hover:scale-110">
                                        <Facebook size={36} strokeWidth={1.5} />
                                    </a>
                                )}
                                {article.instagramUrl && (
                                    <a href={article.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'transform 0.3s' }} className="hover:scale-110">
                                        <Instagram size={36} strokeWidth={1.5} />
                                    </a>
                                )}
                                {article.locationUrl && (
                                    <a href={article.locationUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'transform 0.3s' }} className="hover:scale-110">
                                        <MapPin size={36} strokeWidth={1.5} />
                                    </a>
                                )}
                            </div>
                            {(article.phoneNumber || article.id === 4) && (
                                <div style={{ marginTop: '1rem', textAlign: 'center', fontFamily: 'var(--font-sans)' }}>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {article.id === 4 ? 'CÓMO LLEGAR' : 'Reservaciones'}
                                    </p>
                                    {article.id === 4 ? (
                                        <a href={article.locationUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' }}>
                                            VER MAPA
                                        </a>
                                    ) : (
                                        <a href={`tel:${article.phoneNumber}`} style={{ display: 'block', fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none', letterSpacing: '-0.5px' }}>
                                            {article.phoneNumber}
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>

            </div>

            {/* Gallery Carousel */}
            {
                article.gallery && article.gallery.length > 0 && (
                    <div style={{ marginTop: '4rem', marginBottom: '2rem', padding: '0 5%' }}>
                        <FadeIn delay={600}>
                            <h3 className="section-title-mod" style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.8rem', color: '#1a1a1a' }}>
                                GALERÍA
                            </h3>
                            <div className="gallery-carousel-container">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                    style={{ paddingBottom: '40px', '--swiper-navigation-color': 'var(--color-dorado)', '--swiper-pagination-color': 'var(--color-dorado)' }}
                                >
                                    {article.gallery.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <div style={{
                                                aspectRatio: '4/3',
                                                overflow: 'hidden',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                            }}>
                                                <img
                                                    src={img}
                                                    alt={`${article.title} - Galería ${index + 1}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease'
                                                    }}
                                                    className="hover:scale-105"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </FadeIn>
                    </div>
                )
            }

        </div>
    );
};

export default LayoutStandard;
