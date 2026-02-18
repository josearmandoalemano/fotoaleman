import React from 'react';
import { Link } from 'react-router-dom';

const MagazineHero = ({ article }) => {
    if (!article) return null;

    return (
        <section className="magazine-hero">
            <div className="magazine-hero-bg">
                <img src={article.image} alt={article.title} />
                <div className="magazine-hero-overlay"></div>
            </div>

            <div className="container magazine-hero-content">
                <div className="magazine-hero-text">
                    <span className="magazine-category text-accent">
                        {article.rubric || 'Destacado'}
                    </span>
                    <h1 className="magazine-title">
                        <Link to={`/article/${article.id}`}>
                            {article.title}
                        </Link>
                    </h1>
                    {article.author && (
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginTop: '0.5rem',
                            marginBottom: '1rem',
                            color: 'var(--color-primary-light)',
                            fontFamily: 'var(--font-serif)'
                        }}>
                            Por: {article.author}
                        </p>
                    )}

                    <p className="magazine-description">
                        {article.subtitle || article.description}
                    </p>
                    <Link to={`/article/${article.id}`} className="btn-magazine-cta">
                        LEER ARTÍCULO
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MagazineHero;
