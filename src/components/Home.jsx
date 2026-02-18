import React from 'react';
import Seo from './Seo';
import { Link } from 'react-router-dom';
import MagazineHero from './MagazineHero';
import ArticleGridSection from './ArticleGridSection';
import VaultSection from './VaultSection';
import MobileNewsFeed from './MobileNewsFeed';
import AdBanner from './AdBanner';
import RegionalNewsSection from './RegionalNewsSection';
import ReelsSection from './ReelsSection';
import ArticleCarousel from './ArticleCarousel';
import TesorosCarousel from './TesorosCarousel';
import PhotoOfTheDay from './PhotoOfTheDay';
import CoverFeatureSection from './CoverFeatureSection';
import ExperienceVideoCarousel from './ExperienceVideoCarousel';
import { articles } from '../data/articles';
import bannerT3 from '../assets/banner-t3.png';
import TikTokFloatingButton from './TikTokFloatingButton';

/**
 * Home component - The main entry point for the magazine's homepage.
 * It manages the filtering and distribution of articles across various sections
 * such as the Hero, Saborea Morelos, Weekend Read, and more.
 * 
 * @returns {JSX.Element} The rendered homepage.
 */
const Home = () => {
    // Filter valid articles (Exclude Roma article ID 21 as requested)
    const validArticles = articles.filter(a => a.image && !a.image.includes('placehold.co'));

    // 1. Featured Hero Article
    // Prioritize ID 28 (Parque Melchor Ocampo) for the new hero redesign
    const featuredArticle = validArticles.find(a => a.id === 28) || validArticles.find(a => a.id === 27) || validArticles[0];

    // 2. "Weekend Read" (Single Feature)
    // Prefer Temazcal (ID 17)
    const weekendRead = validArticles.find(a => a.id === 17) || validArticles.find(a => a.id === 12);
    console.log('Home: Weekend Read selected:', weekendRead ? weekendRead.id : 'None');

    // Helper to check if article is already used
    const usedIds = [featuredArticle?.id, weekendRead?.id].filter(Boolean);
    const isUnused = (a) => !usedIds.includes(a.id);

    // 3. "From The Vault" (Tesoros de Morelos - Only Hotels)
    // Prioritize Hotels before other sections to ensure they appear in the Vault
    const vaultCandidates = validArticles.filter(a =>
        a.tags && Array.isArray(a.tags) &&
        (a.tags.includes('Hoteles') || a.tags.includes('Dónde Dormir')) &&
        isUnused(a)
    );
    const vaultArticles = vaultCandidates.slice(0, 3);
    vaultArticles.forEach(a => usedIds.push(a.id));

    // 4. "Travel" Section (Adventure/Nature)
    // Filter by tags: Aventura, Deporte, Naturaleza, Balnearios, etc.
    const travelCandidates = validArticles.filter(a =>
        a.tags && Array.isArray(a.tags) &&
        (a.tags.includes('Aventura') || a.tags.includes('Deporte') || a.tags.includes('Naturaleza') || a.tags.includes('Balnearios')) &&
        isUnused(a)
    );
    const travelArticles = travelCandidates.slice(0, 5); // Take top 5
    travelArticles.forEach(a => usedIds.push(a.id));

    // 5. "Today's Picks" (Saborea Morelos)
    // Explicitly select Foodie/Tradition highlights: 3, 4
    const foodieIds = [3, 4];
    const foodieArticles = validArticles.filter(a => foodieIds.includes(a.id));

    // Fill the rest with generic tag matches, but EXCLUDE Meggie Salgado (22)
    const picksCandidates = validArticles.filter(a =>
        !foodieIds.includes(a.id) &&
        a.id !== 22 &&
        a.id !== featuredArticle?.id &&
        a.tags && Array.isArray(a.tags) &&
        (a.tags.includes('Gastronomía') || a.tags.includes('Historia') || a.tags.includes('Cultura') || a.tags.includes('Tradición')) &&
        isUnused(a)
    );

    const todaysPicks = [...foodieArticles, ...picksCandidates].filter(a => a.id !== 22).slice(0, 5);
    todaysPicks.forEach(a => usedIds.push(a.id));

    // Explicitly mark these as used to prevent them from appearing in RECENT or DISCOVERY carousels
    [1, 3, 4, 17, 22].forEach(id => {
        if (!usedIds.includes(id)) usedIds.push(id);
    });

    // 6. "Tesoros de Morelos" Carousel (Explicit Selection)
    const tesorosIds = [8, 21, 22];
    const tesorosArticles = validArticles.filter(a => tesorosIds.includes(a.id));

    // 6b. "Experiencias Únicas" (Adventure/Nature - Keeping them available for other sections)
    const experienciasIds = [11, 12, 13, 15, 14];
    const experienciasArticles = validArticles.filter(a => experienciasIds.includes(a.id));

    // Mark these as used so they don't appear in the "Travel" section below
    experienciasArticles.forEach(a => usedIds.push(a.id));

    // 7. "Discovery" Carousel - Everything else
    const discoveryArticles = validArticles
        .filter(a => a.id !== featuredArticle?.id && a.id !== 22)
        .reverse();

    return (
        <main className="home-container">
            <Seo
                title="Inicio"
                description="Descubre los mejores destinos, gastronomía y experiencias en Morelos. Revista Nómada es tu guía definitiva para explorar la eterna primavera."
                image={featuredArticle?.image}
            />
            {/* 1. Main Hero */}
            <MagazineHero article={featuredArticle} />

            {/* Experience Video Carousel (New) */}
            <ExperienceVideoCarousel />

            {/* 2. Saborea / Today's Picks Grid (Reversed for List Left) */}
            <ArticleGridSection
                title="SABOREA MORELOS"
                articles={todaysPicks}
                reversed={true}
                adComponent={<AdBanner minimal imageSrc={bannerT3} linkUrl="https://www.t3expediciones.com/" />}
                style={{ marginBottom: '10px' }}
            />

            {/* 3. Weekend Read (Full width visual break) */}
            {weekendRead && (
                <section className="container magazine-hero" style={{ height: '70vh', minHeight: '500px', marginBottom: '0' }}>
                    <div className="magazine-hero-bg">
                        <img src={weekendRead.image} alt={weekendRead.title} />
                        <div className="magazine-hero-overlay"></div>
                    </div>
                    <div className="container magazine-hero-content">
                        <div className="magazine-hero-text">
                            <span className="magazine-category text-accent">Hotel Misión del Sol</span>
                            <h2 className="magazine-title" style={{ fontSize: '3.5rem', textTransform: 'uppercase' }}>
                                {weekendRead.title}
                            </h2>
                            <p className="magazine-description">{weekendRead.subtitle}</p>
                            <Link to={`/article/${weekendRead.id}`} className="btn-magazine-cta">LEER HISTORIA</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. Tesoros de Morelos Carousel (Repositioned) */}
            <TesorosCarousel
                title="TESOROS DE MORELOS"
                subtitle="Los mejores hoteles se distinguen con la denominación Tesoros de Morelos; descúbrelos aquí."
                articles={tesorosArticles}
            />

            {/* Regional News Section */}
            <RegionalNewsSection />

            {/* Cover Feature Section (Reportajes de Portada) */}
            <CoverFeatureSection />

            {/* Reels Section */}
            <ReelsSection />




            {/* 5. Travel Section (Standard Grid) - Hide if empty */}
            {travelArticles.length > 0 && (
                <ArticleGridSection
                    title="VIAJES"
                    articles={travelArticles}
                    style={{ marginBottom: '0px' }}
                />
            )}

            {/* 6. Carousel Section (New) */}
            {discoveryArticles.length > 0 && (
                <ArticleCarousel
                    title="Escapadas Sensoriales"
                    articles={discoveryArticles}
                />
            )}

            {/* 7. Photo of the Day Section */}
            <PhotoOfTheDay />
            <TikTokFloatingButton />
        </main>
    );
};

export default Home;
