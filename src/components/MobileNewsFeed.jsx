import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import SubscriptionModal from './SubscriptionModal';
import instaFeed from '../data/instagram_feed.json';
import instaLatest1 from '../assets/insta_latest_1.jpg';
import instaLatest2 from '../assets/insta_latest_2.jpg';
import instaLatest3 from '../assets/insta_latest_3.jpg';
import mundoFeed from '../data/reportur_feed.json';
import reporturLatest1 from '../assets/reportur_latest_1.jpg';
import reporturLatest2 from '../assets/reportur_latest_2.jpg';
import reporturLatest3 from '../assets/reportur_latest_3.jpg';
import mexicoFeed from '../data/mexico_feed.json';
import mexicoLatest1 from '../assets/mexico_latest_1.jpg';
import mexicoLatest2 from '../assets/mexico_latest_2.jpg';
import mexicoLatest3 from '../assets/mexico_latest_3.jpg';

// Helper component for the list items


// Helper component for the Featured Card (Full width vertical)


// Helper component for inline ads


const MobileNewsFeed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter featured articles and sort by ID descending (newest first)
    // We only show the first one (most recent)
    const featuredArticles = articles
        .filter(article => article.featured)
        .sort((a, b) => b.id - a.id);

    const latestArticle = featuredArticles[0]; // Get only the most recent article



    // Helper to render big article cards with ads


    // Pick specific articles for Featured spots (Mocking selection)


    // List content - Expanded to show more articles (commenting out unused vars for linter)
    // const morelosArticles = articles.slice(0, 10);
    // const mexicoArticles = articles.slice(11, 21);
    // const worldArticles = articles.slice(22, 32);



    return (
        <section className="mobile-news-feed">
            {/* Latest Stories Section - National Geographic Style */}
            <div className="latest-stories-header">
                <h2 className="latest-stories-title">ÚLTIMAS HISTORIAS</h2>
                <p className="latest-stories-subtitle">
                    <button
                        className="subscribe-link-button"
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            font: 'inherit',
                            cursor: 'pointer',
                            color: 'var(--color-primary)', // Use brown accent
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            fontSize: '1.2em', // Make it larger
                            marginRight: '5px'
                        }}
                    >
                        Suscríbete
                    </button>
                    para tener acceso completo y leer historias de Visita Morelos.
                </p>
                <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <div className="latest-stories-divider"></div>
            </div>

            <div className="latest-stories-layout">
                {/* Left Sidebar - Today's Picks */}
                <div className="todays-picks">
                    <div className="todays-picks-header">
                        <div className="picks-marker"></div>
                        <h3 className="picks-title">LAS FAVORITAS DE HOY</h3>
                    </div>

                    <div className="picks-list">
                        {articles.slice(1, 5).map(article => (
                            <Link to={`/article/${article.id}`} key={article.id} className="pick-item">
                                <div className="pick-image-container">
                                    <img src={article.image} alt={article.title} className="pick-image" />
                                </div>
                                <div className="pick-content">
                                    <span className="pick-category">{article.rubric}</span>
                                    <h4 className="pick-title">{article.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right - Latest Featured Story (No Carousel) */}
                <div className="featured-story-main">
                    {latestArticle && (
                        <Link to={`/article/${latestArticle.id}`} className="featured-story-link">
                            <div className="featured-story-image-wrapper">
                                <img src={latestArticle.image} alt={latestArticle.title} className="featured-story-image" />
                                <div className="featured-story-overlay">
                                    <span className="featured-story-category">{latestArticle.rubric}</span>
                                    <h3 className="featured-story-title">{latestArticle.title}</h3>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* Additional Featured Cards Grid */}
            <div className="additional-stories-grid">
                {articles.slice(5, 12).map((article, index) => (
                    <React.Fragment key={article.id}>
                        <Link to={`/article/${article.id}`} className="additional-story-card">
                            <div className="additional-story-image-container">
                                <img src={article.image} alt={article.title} className="additional-story-image" />
                            </div>
                            <div className="additional-story-content">
                                <span className="additional-story-category">{article.rubric}</span>
                                <h4 className="additional-story-title">{article.title}</h4>
                            </div>
                        </Link>
                        {/* Ad after second and fifth cards to fill rows (Total 9 items) */}
                        {(index === 1 || index === 4) && (
                            <div className="additional-story-card ad-card">
                                <div className="additional-story-image-container">
                                    <img
                                        src={`https://placehold.co/600x400/2c3e50/ffffff?text=Publicidad+${index}`}
                                        alt="Advertisement"
                                        className="additional-story-image"
                                    />
                                </div>
                                <div className="additional-story-content">
                                    <span className="additional-story-category ad-badge">PUBLICIDAD</span>
                                    <h4 className="additional-story-title">Espacio Publicitario</h4>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>


            {/* 3-Column Layout: Morelos | Mexico | World */}
            <div className="three-column-section">
                {/* Column 1: Morelos */}
                <div className="news-column">
                    <div className="column-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="column-title" style={{ margin: 0 }}>Notas Morelos</h3>
                    </div>
                    <div className="three-column-list">
                        {instaFeed.slice(0, 3).map((item, index) => {
                            // Map index to the correct imported image
                            const images = [instaLatest1, instaLatest2, instaLatest3];
                            const image = images[index] || images[0];

                            return (
                                <a
                                    href={item.link}
                                    key={item.id}
                                    className="minimize-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="minimize-card-image-wrapper">
                                        <img src={image} alt={item.title} className="minimize-card-image" />
                                        {/* Instagram Icon Overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            borderRadius: '50%',
                                            padding: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="minimize-card-content" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', width: '100%' }}>
                                        <span className="minimize-card-rubric" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>{item.rubric}</span>
                                        <h4 className="minimize-card-title text-contrast-safe">{item.title}</h4>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Column 2: Mexico */}
                <div className="news-column">
                    <div className="column-header">
                        <h3 className="column-title">Notas México</h3>
                    </div>
                    <div className="three-column-list">
                        {mexicoFeed.slice(0, 3).map((article, index) => {
                            const images = [mexicoLatest1, mexicoLatest2, mexicoLatest3];
                            const image = images[index] || images[0];

                            return (
                                <a
                                    href={article.link}
                                    key={article.id}
                                    className="minimize-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="minimize-card-image-wrapper">
                                        <img src={image} alt={article.title} className="minimize-card-image" />
                                    </div>
                                    <div className="minimize-card-content">
                                        <span className="minimize-card-rubric">{article.rubric}</span>
                                        <h4 className="minimize-card-title">{article.title}</h4>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Column 3: World */}
                <div className="news-column">
                    <div className="column-header">
                        <h3 className="column-title">Notas Reportur</h3>
                    </div>
                    <div className="three-column-list">
                        {mundoFeed.slice(0, 3).map((article, index) => {
                            const images = [reporturLatest1, reporturLatest2, reporturLatest3];
                            const image = images[index] || images[0];

                            return (
                                <a
                                    href={article.link}
                                    key={article.id}
                                    className="minimize-card"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="minimize-card-image-wrapper">
                                        <img src={image} alt={article.title} className="minimize-card-image" />
                                    </div>
                                    <div className="minimize-card-content">
                                        <span className="minimize-card-rubric">{article.rubric || 'TURISMO'}</span>
                                        <h4 className="minimize-card-title">{article.title}</h4>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default MobileNewsFeed;
