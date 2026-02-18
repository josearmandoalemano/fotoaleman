import React from 'react';
import { Link } from 'react-router-dom';

const VaultSection = ({ articles }) => {
    if (!articles || articles.length === 0) return null;
    const vaultArticles = articles.slice(0, 3); // Take 3 items

    return (
        <section className="vault-section">
            <div className="container">
                <div className="vault-header">
                    <h2 className="vault-title">Tesoros de Morelos</h2>
                    <p className="vault-subtitle">
                        Los mejores hoteles se distinguen con la denominación Tesoros de Morelos; descúbrelos aquí.
                    </p>
                </div>

                <div className="vault-grid">
                    {vaultArticles.map(article => (
                        <Link key={article.id} to={`/article/${article.id}`} className="vault-card">
                            <div className="vault-image-wrapper">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="vault-image"
                                />
                            </div>
                            <div className="vault-content">
                                <h3 className="vault-card-title">{article.title}</h3>
                                <p className="vault-card-excerpt">
                                    {article.subtitle || 'Un vistazo al pasado de nuestra historia.'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VaultSection;
