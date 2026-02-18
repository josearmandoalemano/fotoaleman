import React from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ArticleLayouts.css';

const LayoutAntigravity = ({ article }) => {
    return (
        <div className="layout-antigravity">

            {/* Background Texture */}
            <div className="anti-bg">
                <img src="https://picsum.photos/seed/space_stars/1600/1200" alt="Stars" />
            </div>

            <div className="anti-container">

                {/* Header */}
                <div className="anti-header">
                    <div style={{ maxWidth: '800px' }}>
                        <span className="anti-rubric">{article.rubric || "Futuro • Tecnología"}</span>
                        <h1 className="anti-title">
                            {article.title}
                        </h1>
                        <p className="anti-subtitle">
                            {article.subtitle}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'none', md: { display: 'block' } }}>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reportaje Especial</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="anti-grid">

                    {/* Left Column (Visual) */}
                    <div>
                        <div className="anti-sidebar-img">
                            <img src={article.image} alt={article.title} />
                            <div className="anti-caption">
                                "{article.subtitle}"
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Text) */}
                    <div>
                        <div className="anti-body columns-2">
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </div>

                        <div className="anti-footer-quote">
                            <p className="anti-footer-text">
                                "{article.subtitle}"
                            </p>
                            <p className="anti-footer-author">— {article.author}</p>
                        </div>

                        {/* Contact & Info Section (Antigravity Style) */}
                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'center' }}>

                                {/* Socials */}
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    {article.facebookUrl && (
                                        <a href={article.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', transition: 'color 0.3s' }}>
                                            <Facebook size={24} />
                                        </a>
                                    )}
                                    {article.instagramUrl && (
                                        <a href={article.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', transition: 'color 0.3s' }}>
                                            <Instagram size={24} />
                                        </a>
                                    )}
                                    {article.locationUrl && (
                                        <a href={article.locationUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', transition: 'color 0.3s' }}>
                                            <MapPin size={24} />
                                        </a>
                                    )}
                                </div>

                                {/* Phone / Price */}
                                <div style={{ textAlign: 'right' }}>
                                    {article.price && (
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                                            {article.price}
                                        </p>
                                    )}
                                    {article.phoneNumber && (
                                        <a href={`tel:${article.phoneNumber}`} style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }}>
                                            {article.phoneNumber}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Article Gallery Carousel */}
                {article.gallery && article.gallery.length > 0 && (
                    <div className="anti-gallery-section" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }}></div>
                        <h2 style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '2rem',
                            color: '#ffffff',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            letterSpacing: '0.05em'
                        }}>
                            Galería
                        </h2>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                960: { slidesPerView: 3 }
                            }}
                            style={{
                                paddingBottom: '40px',
                                '--swiper-navigation-color': '#ffffff',
                                '--swiper-pagination-color': '#ffffff',
                                '--swiper-navigation-size': '25px'
                            }}
                        >
                            {article.gallery.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div style={{
                                        position: 'relative',
                                        aspectRatio: '3/2',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                    }}>
                                        <img
                                            src={img}
                                            alt={`${article.title} - Galería ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                filter: 'brightness(0.9)'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                                e.currentTarget.style.filter = 'brightness(1)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.filter = 'brightness(0.9)';
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LayoutAntigravity;
