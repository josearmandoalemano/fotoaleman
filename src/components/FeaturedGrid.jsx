import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

const FeaturedGrid = () => {
    // Get the first 5 articles for the grid
    const featuredArticles = articles.slice(0, 5);

    return (
        <section className="featured-grid container">
            <div className="grid-layout">
                {/* Main Feature - Large */}
                <div className="main-feature">
                    {featuredArticles[0] && (
                        <div className="feature-card large">
                            <Link to={`/article/${featuredArticles[0].id}`}>
                                <img src={featuredArticles[0].image} alt={featuredArticles[0].title} />
                            </Link>
                            <div className="feature-overlay">
                                <span className="feature-rubric">{featuredArticles[0].rubric}</span>
                                <h2><Link to={`/article/${featuredArticles[0].id}`}>{featuredArticles[0].title}</Link></h2>
                            </div>
                        </div>
                    )}
                </div>

                {/* Side Features - 2 stacked */}
                <div className="side-features">
                    {featuredArticles.slice(1, 3).map(article => (
                        <div key={article.id} className="feature-card medium">
                            <Link to={`/article/${article.id}`}>
                                <img src={article.image} alt={article.title} />
                            </Link>
                            <div className="feature-overlay">
                                <span className="feature-rubric">{article.rubric}</span>
                                <h3><Link to={`/article/${article.id}`}>{article.title}</Link></h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Features - 2 side by side */}
                <div className="bottom-features">
                    {featuredArticles.slice(3, 5).map(article => (
                        <div key={article.id} className="feature-card small">
                            <Link to={`/article/${article.id}`}>
                                <img src={article.image} alt={article.title} />
                            </Link>
                            <div className="feature-overlay">
                                <span className="feature-rubric">{article.rubric}</span>
                                <h3><Link to={`/article/${article.id}`}>{article.title}</Link></h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedGrid;
