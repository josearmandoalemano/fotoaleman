
import React from 'react';
import logoFooter from '../assets/logo_footer.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content" style={{
                width: '100%',
                maxWidth: '100%',
                padding: '0 4vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div className="footer-brand" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={logoFooter}
                        alt="Experiencia Nómada"
                        style={{
                            height: '90px',
                            width: 'auto'
                        }}
                    />
                </div>
                <div className="footer-links" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '3rem',
                    fontSize: '1rem'
                }}>
                    <a href="https://www.facebook.com/revistanomadaoficial" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', transition: 'color 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/experiencianomada_/" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', transition: 'color 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <a href="https://www.tiktok.com/@revista_nomada" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', transition: 'color 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="feather feather-tiktok">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.58-1.09-1.01.88-2.61.9-2.91 2.45v2.85c-.06 1.83-.56 3.73-1.66 5.25-1.92 2.37-5.02 3.65-8.03 2.87-1.43-.32-2.73-1.04-3.76-2.06-1.51-1.63-2.1-4-1.6-6.19.46-1.98 1.76-3.72 3.56-4.66 1.55-.83 3.39-.96 5.12-.49v4.5c-.83-.41-1.85-.46-2.71-.05-.82.35-1.41 1.14-1.46 2.05-.08 1.54 1.28 2.94 2.82 2.92 1.62.03 3.08-1.16 3.09-2.79V.02h3.42z" />
                        </svg>
                    </a>
                    <a href="https://www.youtube.com/@ExperieciaN%C3%B3mada" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', transition: 'color 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-youtube">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                    </a>
                    <a href="https://x.com/Exnomada" target="_blank" rel="noopener noreferrer" style={{ color: '#333333', transition: 'color 0.3s ease' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </a>
                </div>
                <div className="footer-contact" style={{
                    textAlign: 'center',
                    marginBottom: '5px' // Slight adjustment to align visually if needed, or remove completely. Keeping minimal.
                }}>
                    <a href="mailto:contacto@experiencianomada.com" style={{
                        color: '#333333',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        borderBottom: '1px solid rgba(51, 51, 51, 0.3)',
                        paddingBottom: '2px',
                        transition: 'color 0.3s ease'
                    }}>
                        contacto@experiencianomada.com
                    </a>
                </div>
                <div className="footer-links" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    fontSize: '0.9rem',
                    opacity: 0.8
                }}>
                    <a href="/politicas-privacidad" style={{ color: '#333333', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                        Políticas de Privacidad
                    </a>
                    <span style={{ color: '#333333' }}>|</span>
                    <a href="/terminos-uso" style={{ color: '#333333', textDecoration: 'none', transition: 'color 0.3s ease' }}>
                        Términos de Uso
                    </a>
                </div>
                <div className="footer-copyright" style={{
                    textAlign: 'center',
                    color: '#333333',
                    fontSize: '0.85rem'
                }}>
                    &copy; 2026 Experiencia Nómada. Todos los derechos reservados.
                </div>
            </div>
            <div className="footer-bottom-info" style={{
                marginTop: '1.5rem',
                padding: '10px 0',
                textAlign: 'center',
                opacity: 0.4
            }}>
                <div className="footer-credits" style={{
                    fontSize: '0.65rem',
                    color: '#333333',
                    letterSpacing: '0.1em'
                }}>
                    Edición Experiencia Nómada, Desarrollo <a href="https://dochoar.github.io/index.html" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>David Ochoa</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
