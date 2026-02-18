import React from 'react';
import { Facebook, Instagram, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ArticleLayouts.css';

const LayoutTaxco = ({ article }) => {
    return (
        <div className="layout-taxco">
            {/* Texture Overlay */}
            <div className="taxco-bg-overlay">
                <img src="https://picsum.photos/seed/church_night/800/1200" alt="Texture" />
            </div>

            <div className="taxco-grid">

                {/* Left Column (Image Heavy) */}
                <div className="taxco-image-col">
                    <img
                        src={article.image}
                        alt={article.title}
                    />
                    <div className="taxco-image-overlay">
                        <div style={{ color: '#ffffff', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                            {article.author}
                        </div>
                        <div style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>
                            "{article.subtitle}"
                        </div>
                    </div>
                </div>

                {/* Right Column (Typography Heavy) */}
                <div className="taxco-content-col">
                    <div style={{ marginBottom: '3rem' }}>
                        <span className="taxco-rubric">{article.rubric || "Tradiciones"}</span>
                        <h1 className="taxco-title" dangerouslySetInnerHTML={{ __html: article.title.replace(' ', '<br/><span>').replace(':', '</span><br/>') }}>
                            {/* Title injected securely or processed above */}
                        </h1>
                        {/* Fallback simple title if no HTML replacement needed */}
                        {!article.title.includes('<') && (
                            <h2 className="taxco-subtitle">
                                {article.title}
                            </h2>
                        )}
                    </div>

                    <div className="taxco-body columns-2 justify">
                        {/* We inject the content HTML but need to handle the drop-cap manually or via CSS */}
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    {/* Contact Info (Taxco Style) */}
                    <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <h3 className="taxco-rubric" style={{ borderBottom: 'none', marginBottom: '1.5rem', display: 'block', textAlign: 'center' }}>Información</h3>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                            {article.facebookUrl && (
                                <a href={article.facebookUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8 }} className="hover:opacity-100">
                                    <Facebook size={28} strokeWidth={1} />
                                </a>
                            )}
                            {article.instagramUrl && (
                                <a href={article.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8 }} className="hover:opacity-100">
                                    <Instagram size={28} strokeWidth={1} />
                                </a>
                            )}
                            {article.locationUrl && (
                                <a href={article.locationUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8 }} className="hover:opacity-100">
                                    <MapPin size={28} strokeWidth={1} />
                                </a>
                            )}
                        </div>

                        <div style={{ textAlign: 'center', fontFamily: 'var(--font-sans)', color: '#d1d5db' }}>
                            {article.price && (
                                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>{article.price}</p>
                            )}
                            {article.phoneNumber && (
                                <a href={`tel:${article.phoneNumber}`} style={{ display: 'block', fontSize: '1.25rem', color: '#ffffff', textDecoration: 'none' }}>
                                    {article.phoneNumber}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LayoutTaxco;
