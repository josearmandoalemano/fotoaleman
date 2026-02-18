
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { supabase } from '../lib/supabaseClient';
import './SearchPage.css'; // We'll create this next

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || '';
    // Log search only once when query changes
    useEffect(() => {
        if (query) {
            const logSearch = async () => {
                try {
                    await supabase.from('search_logs').insert([{ query }]);
                } catch (err) {
                    console.error('Error logging search:', err);
                }
            };
            logSearch();
        }
    }, [query]);

    // Client-side search (derived state, no need for useEffect + setState)
    const results = query ? articles.filter(article => {
        const lowerQuery = query.toLowerCase();
        const titleMatch = article.title.toLowerCase().includes(lowerQuery);
        const rubricMatch = article.rubric && article.rubric.toLowerCase().includes(lowerQuery);
        const tagsMatch = article.tags && article.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        return titleMatch || rubricMatch || tagsMatch;
    }) : [];

    if (!query) {
        return (
            <div className="search-page-container container">
                <h2>Búsqueda</h2>
                <p>Ingresa un término para buscar.</p>
            </div>
        );
    }

    return (
        <div className="search-page-container container">
            <h2 className="search-results-title">
                Resultados para: <span className="highlight-query">"{query}"</span>
            </h2>

            {results.length === 0 ? (
                <div className="no-results">
                    <p>No encontramos historias que coincidan con tu búsqueda.</p>
                    <Link to="/" className="back-home-btn">Volver al Inicio</Link>
                </div>
            ) : (
                <div className="search-results-grid">
                    {results.map(article => (
                        <Link to={`/article/${article.id}`} key={article.id} className="search-result-card">
                            <div className="search-card-image">
                                <img src={article.image} alt={article.title} />
                            </div>
                            <div className="search-card-content">
                                <span className="search-card-rubric">{article.rubric}</span>
                                <h3 className="search-card-title">{article.title}</h3>
                                <p className="search-card-subtitle">{article.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
