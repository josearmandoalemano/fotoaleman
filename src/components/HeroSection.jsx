import React from 'react';
import { articles } from '../data/articles';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    // Get the last article in the array which corresponds to the latest one
    const latestArticle = articles[articles.length - 1];

    if (!latestArticle) return null;

    return (
        <section className="hero">
            <img
                src={latestArticle.image}
                alt={latestArticle.title}
                className="hero-bg"
            />
            <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }}>
                <div className="hero-content">
                    <span className="hero-rubric text-contrast-safe">{latestArticle.rubric}</span>
                    <h1 className="hero-title text-contrast-safe-heavy">{latestArticle.title}</h1>
                    <p className="hero-desc text-contrast-safe">{latestArticle.subtitle}</p>
                    <Link to={`/article/${latestArticle.id}`} className="hero-btn">Leer más</Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
