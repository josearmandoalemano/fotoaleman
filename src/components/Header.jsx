
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo_experiencia_v4.png';
import { categories } from '../data/categories';
import SubscriptionModal from './SubscriptionModal';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                setSearchTerm(''); // Optional: clear after search
            }
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                    {/* Menu Container with Hover Logic */}
                    <div
                        className="menu-container"
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                        onFocus={() => setIsMenuOpen(true)}
                        onBlur={() => setIsMenuOpen(false)}
                    >
                        <button
                            className="menu-toggle"
                            aria-label="Menú principal"
                            aria-expanded={isMenuOpen}
                            onClick={(e) => {
                                // Toggle on click, stop propagation to avoid immediate close by other handlers if any
                                setIsMenuOpen(!isMenuOpen);
                                e.currentTarget.focus();
                            }}
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>

                        {/* Dropdown Mega Menu */}
                        <div className={`mega-menu ${isMenuOpen ? 'open' : ''}`}>
                            <div className="mega-menu-content">
                                <span className="mega-menu-title">Disfruta Morelos</span>
                                <ul className="mega-menu-list">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link
                                                to={cat.path}
                                                className="mega-menu-link"
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Link to="/" className="logo">
                        <img src={logoImg} alt="Nómada" className="header-logo-img" />
                    </Link>
                </div>

                <nav className="desktop-nav" aria-label="Navegación principal">
                    <ul className="nav-links">
                        <li><Link to="/category/Explora">Explora</Link></li>
                        <li><Link to="/category/Saborea">Saborea</Link></li>
                        <li><Link to="/category/Descansa">Descansa</Link></li>
                    </ul>
                </nav>

                <div className="nav-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="search-input"
                            aria-label="Buscar en el sitio"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <span
                            className="search-icon"
                            aria-hidden="true"
                            onClick={handleSearch}
                            style={{ cursor: 'pointer' }}
                        >
                            🔍
                        </span>
                    </div>
                    <button
                        className="btn-suscribirse"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Suscríbete
                    </button>
                </div>
            </div>
            <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
};

export default Header;
