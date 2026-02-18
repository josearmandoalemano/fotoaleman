import React from 'react';
import { Link } from 'react-router-dom';

const ArticleGridSection = ({ title, articles, adComponent, reversed = false, className = '', style = {} }) => {
    if (!articles || articles.length === 0) return null;

    const mainArticle = articles[0];
    const subArticles = articles.slice(1, 5);

    return (
        <section className={`container grid-section ${className}`} style={style}>
            <div className="section-header-row">
                {title && <h2 className="section-title">{title}</h2>}
            </div>

            <div className={`magazine-grid ${reversed ? 'grid-reversed' : ''}`}>
                {/* Main Feature Column */}
                <div className="magazine-main-col">
                    <Link to={`/article/${mainArticle.id}`} className="magazine-card-main">
                        <div className="magazine-card-image-wrapper">
                            <img
                                src={mainArticle.image}
                                alt={mainArticle.title}
                                className="magazine-card-image"
                            />
                        </div>
                        <div className="magazine-card-content">
                            <span className="magazine-rubric">{mainArticle.rubric}</span>
                            <h3 className="magazine-card-title-lg">{mainArticle.title}</h3>

                            <p className="magazine-card-excerpt">{mainArticle.subtitle}</p>
                            <span className="magazine-read-more">LEER ARTÍCULO</span>
                        </div>
                    </Link>
                </div>

                {/* Sidebar List Column */}
                <div className="magazine-sidebar-col">
                    <div className="magazine-list">
                        {subArticles.map(article => (
                            <Link key={article.id} to={`/article/${article.id}`} className="magazine-list-item">
                                <div className="magazine-list-image-wrapper">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="magazine-list-image"
                                    />
                                </div>
                                <div className="magazine-list-content">
                                    <span className="magazine-rubric-sm">{article.rubric || 'NOTICIA'}</span>
                                    <h4 className="magazine-list-title">{article.title}</h4>
                                </div>
                            </Link>
                        ))}

                        {/* Optional Ad Injection in Sidebar */}
                        {adComponent && (
                            <div className="magazine-sidebar-ad">
                                {adComponent}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArticleGridSection;
