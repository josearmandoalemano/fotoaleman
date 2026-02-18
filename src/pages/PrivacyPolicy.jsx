import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="app">
            <Header />
            <main className="legal-page">
                <div className="container" style={{ maxWidth: '900px', padding: '2rem 1rem' }}>
                    <nav style={{ marginBottom: '2rem' }}>
                        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>
                            ← Volver al inicio
                        </Link>
                    </nav>

                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>
                        Políticas de Privacidad
                    </h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        Última actualización: 21 de enero de 2026
                    </p>

                    <div className="legal-content">
                        <section className="legal-section">
                            <h2>1. Información que Recopilamos</h2>
                            <p>
                                En Revista Nómada, nos comprometemos a proteger su privacidad. Recopilamos información
                                de forma limitada para mejorar su experiencia en nuestro sitio web:
                            </p>
                            <ul>
                                <li><strong>Información de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia</li>
                                <li><strong>Cookies:</strong> Utilizamos cookies para mejorar la funcionalidad del sitio</li>
                                <li><strong>Suscripción al newsletter:</strong> Correo electrónico (solo si usted se suscribe voluntariamente)</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>2. Uso de la Información</h2>
                            <p>Utilizamos la información recopilada para:</p>
                            <ul>
                                <li>Mejorar el contenido y la experiencia del usuario en nuestro sitio</li>
                                <li>Enviar actualizaciones sobre nuevos artículos (solo a suscriptores)</li>
                                <li>Analizar tendencias y estadísticas de uso del sitio</li>
                                <li>Cumplir con obligaciones legales</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>3. Cookies y Tecnologías Similares</h2>
                            <p>
                                Nuestro sitio utiliza cookies para mejorar su experiencia de navegación. Las cookies son
                                pequeños archivos de texto almacenados en su dispositivo que nos ayudan a:
                            </p>
                            <ul>
                                <li>Recordar sus preferencias de navegación</li>
                                <li>Analizar el tráfico del sitio mediante herramientas de análisis</li>
                                <li>Proporcionar contenido personalizado</li>
                            </ul>
                            <p>
                                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar
                                algunas funcionalidades del sitio.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>4. Compartir Información con Terceros</h2>
                            <p>
                                No vendemos, alquilamos ni compartimos su información personal con terceros para
                                fines comerciales. Podemos compartir información de forma anónima y agregada con:
                            </p>
                            <ul>
                                <li>Herramientas de análisis web (ej. Google Analytics)</li>
                                <li>Proveedores de servicios de hosting</li>
                                <li>Autoridades gubernamentales cuando sea requerido por ley</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>5. Sus Derechos (GDPR y Ley Federal de Protección de Datos Personales)</h2>
                            <p>Usted tiene derecho a:</p>
                            <ul>
                                <li><strong>Acceder</strong> a sus datos personales</li>
                                <li><strong>Rectificar</strong> información incorrecta o incompleta</li>
                                <li><strong>Cancelar</strong> sus datos de nuestras bases de datos</li>
                                <li><strong>Oponerse</strong> al tratamiento de sus datos personales</li>
                                <li><strong>Limitar</strong> el procesamiento de sus datos</li>
                                <li><strong>Portabilidad</strong> de datos</li>
                            </ul>
                            <p>
                                Para ejercer estos derechos, contáctenos a través de: <strong>contacto@revistanomada.com</strong>
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>6. Seguridad de la Información</h2>
                            <p>
                                Implementamos medidas de seguridad técnicas y organizativas para proteger su información
                                contra acceso no autorizado, pérdida o alteración. Sin embargo, ninguna transmisión por
                                internet es completamente segura, por lo que no podemos garantizar seguridad absoluta.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>7. Enlaces a Sitios de Terceros</h2>
                            <p>
                                Nuestro sitio puede contener enlaces a sitios web de terceros. No somos responsables
                                de las prácticas de privacidad de estos sitios. Le recomendamos revisar sus políticas
                                de privacidad antes de proporcionar información personal.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>8. Cambios a esta Política</h2>
                            <p>
                                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento.
                                Los cambios se publicarán en esta página con la fecha de actualización correspondiente.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>9. Contacto</h2>
                            <p>
                                Para cualquier pregunta sobre esta política de privacidad, puede contactarnos en:
                            </p>
                            <p>
                                <strong>Email:</strong> contacto@revistanomada.com<br />
                                <strong>Sitio web:</strong> www.revistanomada.com
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
