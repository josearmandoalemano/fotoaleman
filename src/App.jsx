
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoCarousel from './components/VideoCarousel';
import ArticleGrid from './components/ArticleGrid';
import CategoryCarousel from './components/CategoryCarousel';
import Footer from './components/Footer';
import ArticlePage from './components/ArticlePage';
import CategoryPage from './components/CategoryPage';
import GastronomyPage from './components/GastronomyPage';
import RestaurantPage from './components/RestaurantPage';
import Home from './components/Home';
import AdBanner from './components/AdBanner';
import SearchPage from './components/SearchPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

import Dashboard from './components/Dashboard';
import AnalyticsTracker from './components/AnalyticsTracker';

function App() {
  /*
  const homeArticles = articles
    .filter(article => article.image && !article.image.includes('placehold.co'))
    .slice(0, 20);
  */

  return (
    <Router>
      <AnalyticsTracker />
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/gastronomy" element={<GastronomyPage />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/politicas-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-uso" element={<TermsOfUse />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <AdBanner />
        <Footer />
      </div >
    </Router >
  );
}

export default App;
