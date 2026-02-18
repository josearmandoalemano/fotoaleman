
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const CoverFeatureSection = () => {
    // Select specific articles for "Cover Reports". 
    // Ideally these are high impact "Reportajes". 
    // Let's pick a few that might not be heavily featured elsewhere or are very strong.
    // Examples: ID 9 (Zapata), ID 4 (Tlayacapan), ID 5 (Café).
    // Avoiding ID 20 (Hacienda San Antonio) as it is likely the main hero.

    // Let's filter for specific IDs to ensure quality "Cover" content.
    const coverIds = [25, 9, 4, 5];
    const coverArticles = articles.filter(a => coverIds.includes(a.id));

    if (coverArticles.length === 0) return null;

    // Main text color style
    const textColor = '#ffffff';

    return (
        <section className="cover-feature-section" style={{ padding: '20px 0', background: '#000' }}>
            <div className="container">
                <div style={{
                    borderLeft: '4px solid var(--color-primary)',
                    paddingLeft: '15px',
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h2 style={{
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '1.5rem',
                        margin: 0
                    }}>
                        REPORTAJE ESPECIAL
                    </h2>
                    <span style={{
                        color: 'var(--color-primary)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        ESPACIO ESPECIAL
                    </span>
                </div>

                <div className="cover-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {coverArticles.map(article => (
                        <Link to={`/article/${article.id}`} key={article.id} className="cover-card" style={{ textDecoration: 'none', group: 'cover-card' }}>
                            <div className="cover-image-wrapper" style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '8px',
                                aspectRatio: '16/9',
                                marginBottom: '15px'
                            }}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease',
                                        display: 'block'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    background: 'var(--color-primary)',
                                    color: '#000',
                                    padding: '4px 8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    borderRadius: '2px'
                                }}>
                                    REPORTAJE ESPECIAL
                                </div>
                            </div>
                            <div className="cover-content">
                                <h3 style={{
                                    color: textColor,
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    fontFamily: 'var(--font-serif)',
                                    marginBottom: '5px',
                                    lineHeight: '1.3'
                                }}>
                                    {article.title}
                                </h3>

                                <p style={{
                                    color: '#ccc',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.6',
                                    display: 'block',
                                    overflow: 'visible'
                                }}>
                                    {article.subtitle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoverFeatureSection;
