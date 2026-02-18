import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import Sidebar from './Sidebar';
import Seo from './Seo';

// Import New Layouts
import LayoutStandard from './layouts/LayoutStandard';
import LayoutTaxco from './layouts/LayoutTaxco';
import LayoutAntigravity from './layouts/LayoutAntigravity';

const ArticlePage = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Artículo no encontrado</h2>
                <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Volver al inicio</Link>
            </div>
        );
    }

    // Dynamic Layout Selection
    const renderLayout = () => {
        switch (article.layout) {
            case 'taxco':
                return <LayoutTaxco article={article} />;
            case 'antigravity':
                return <LayoutAntigravity article={article} />;
            case 'standard':
            default:
                // For articles without a specific layout, use Standard but allow fallback to old if preferred
                // For now, we'll try to use Standard for everything to Unify look
                return <LayoutStandard article={article} />;
        }
    };

    return (
        <>
            <Seo
                title={article.title}
                description={article.subtitle || `Lee sobre ${article.title} en Revista Nómada.`}
                image={article.image}
                url={`/article/${article.id}`}
                type="article"
            />
            {renderLayout()}
        </>
    );
};

export default ArticlePage;
