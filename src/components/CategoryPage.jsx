
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import ArticleGrid from './ArticleGrid';
import Seo from './Seo';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const decodedCategory = decodeURIComponent(categoryName);

    // Smart Mapping: Map menu categories to article tags
    const categoryMapping = {
        "Distrito Lujo": ["Distrito Lujo", "Lujo", "Haciendas", "Premium"],
        "Coordenada Secreta": ["Coordenada Secreta", "Secreto", "Exclusivo", "Joyas Ocultas"],
        "TechTravel": ["TechTravel", "Tecnología", "Digital Nomad", "Wifi"],
        "Sabores de Morelos": ["Sabores de Morelos", "Gastronomía", "Qué Comer", "Restaurantes", "Café"],
        "Melatte Social": ["Melatte / Social", "Social", "Lifestyle", "Eventos"],
        "Raíces": ["Raíces", "Historia", "Tradición", "Cultura"],
        "Turismo de salud y bienestar": ["Turismo de salud y bienestar", "Bienestar", "Spa", "Salud", "Relajación", "Temazcal"],
        "Turismo idiomático": ["Turismo idiomático", "Escuelas", "Español"],
        "Plan Familiar": ["Plan Familiar", "Familiar", "Niños", "Balnearios"],
        "Guía Práctica": ["Guía Práctica", "Tips", "Guía", "Consejos"],
        "Turismo deportivo": ["Turismo deportivo", "Deportes", "Aventura", "Golf", "Motocross"],
        "Destinos": ["Destinos", "Pueblos Mágicos", "Morelos"],
        "Explora": ["Aventura", "Naturaleza", "Destinos"],
        "Saborea": ["Gastronomía", "Café", "Qué Comer"],
        "Descansa": ["Historia", "Cultura", "Tradición"]
    };

    // Determine target tags: Use mapping or fall back to the raw category name
    const targetTags = categoryMapping[decodedCategory] || [decodedCategory];

    // Filter articles that have ANY of the target tags OR match relevant rubrics
    const filteredArticles = articles.filter(article => {
        const hasTag = article.tags && article.tags.some(tag => targetTags.includes(tag));
        const isGastronomyOrCafe = article.rubric && (
            article.rubric.includes("Café") ||
            article.rubric.includes("Sabores") ||
            article.rubric.includes("Tradición")
        );

        if (!hasTag && !isGastronomyOrCafe) return false;

        // User requested exclusions:
        // 1. No Meggie Salgado (ID 22) in "Saborea"
        if (decodedCategory === "Saborea") {
            if (article.id === 22) return false;
        }

        // 2. No "Ruta Foodie", "Tradición y Misticismo", Cafeterias or Raíces in "Descansa"
        if (decodedCategory === "Descansa") {
            const excludedRubrics = ["Sabores de Morelos", "Tradición y Misticismo"];
            if (excludedRubrics.includes(article.rubric)) return false;

            // Remove all cafeterias and Raíces sections
            const rubric = article.rubric || "";
            if (rubric.includes("Café") || rubric.includes("Raíces")) return false;

            // Also exclude specific IDs mentioned by user for "Descansa"
            if ([1, 3, 4].includes(article.id)) return false;
        }

        return true;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    return (
        <div className="category-page">
            <Seo
                title={`${decodedCategory} | Revista Nómada`}
                description={`Explora nuestra selección de artícuyos sobre ${decodedCategory} en Revista Nómada. Encuentra los mejores lugares y experiencias.`}
                url={`/category/${categoryName}`}
                type="website"
            />
            <header className="category-header container" style={{ padding: '60px 0 20px' }}>
                <span style={{
                    color: 'var(--color-text-main)',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    display: 'block',
                    marginBottom: '10px',
                    fontSize: '0.9rem'
                }}>Explora: {decodedCategory}</span>
                <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    color: 'var(--color-text-main)',
                    display: 'inline-block',
                    paddingBottom: '10px',
                    borderBottom: '4px solid var(--color-dorado)',
                }}>
                    {filteredArticles.length} Experiencias Encontradas
                </h1>
            </header>

            {filteredArticles.length > 0 ? (
                <ArticleGrid articles={filteredArticles} />
            ) : (
                <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--color-text-body)' }}>
                        Próximamente agregaremos más contenido para <strong>{decodedCategory}</strong>.
                    </p>
                    <a href="/" style={{
                        marginTop: '20px',
                        display: 'inline-block',
                        color: 'var(--color-primary)',
                        fontWeight: 'bold',
                        borderBottom: '2px solid var(--color-primary)'
                    }}>Volver al Inicio</a>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
