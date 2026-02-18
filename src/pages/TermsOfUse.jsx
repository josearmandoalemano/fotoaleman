import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
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
                        Términos de Uso
                    </h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        Última actualización: 21 de enero de 2026
                    </p>

                    <div className="legal-content">
                        <section className="legal-section">
                            <h2>1. Aceptación de los Términos</h2>
                            <p>
                                Al acceder y utilizar el sitio web de Revista Nómada (en adelante, "el Sitio"),
                                usted acepta cumplir con estos Términos de Uso. Si no está de acuerdo con alguna
                                parte de estos términos, le recomendamos no utilizar nuestro Sitio.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>2. Descripción del Servicio</h2>
                            <p>
                                Revista Nómada es una publicación digital dedicada a promover el turismo, la cultura
                                y la gastronomía del estado de Morelos, México. Ofrecemos contenido informativo,
                                artículos, fotografías y videos sobre destinos turísticos, eventos culturales y
                                experiencias gastronómicas en la región.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>3. Uso Aceptable</h2>
                            <p>Al utilizar nuestro Sitio, usted se compromete a:</p>
                            <ul>
                                <li>No utilizar el Sitio para fines ilegales o no autorizados</li>
                                <li>No intentar obtener acceso no autorizado a ninguna parte del Sitio</li>
                                <li>No transmitir virus, malware o cualquier código de naturaleza destructiva</li>
                                <li>No copiar, reproducir o distribuir contenido sin autorización previa</li>
                                <li>No utilizar robots, scrapers o herramientas automatizadas sin permiso expreso</li>
                                <li>Respetar los derechos de propiedad intelectual del contenido publicado</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>4. Propiedad Intelectual</h2>
                            <p>
                                Todo el contenido publicado en el Sitio, incluyendo pero no limitado a textos,
                                fotografías, videos, gráficos, logos, diseños y código, es propiedad de Revista Nómada
                                o de sus colaboradores y está protegido por las leyes de derechos de autor mexicanas
                                e internacionales.
                            </p>
                            <p>
                                Queda prohibida la reproducción, distribución, modificación o uso comercial del contenido
                                sin autorización previa por escrito.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>5. Contenido de Usuario</h2>
                            <p>
                                Si el Sitio permite la publicación de comentarios o contenido generado por usuarios,
                                usted conserva la propiedad de dicho contenido pero otorga a Revista Nómada una
                                licencia mundial, no exclusiva y libre de regalías para usar, modificar y distribuir
                                dicho contenido.
                            </p>
                            <p>
                                Usted es responsable del contenido que publique y garantiza que no infringe derechos
                                de terceros.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>6. Enlaces a Terceros</h2>
                            <p>
                                El Sitio puede contener enlaces a sitios web de terceros para su conveniencia.
                                Revista Nómada no controla ni respalda estos sitios y no se hace responsable de
                                su contenido, políticas de privacidad o prácticas.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>7. Exención de Garantías</h2>
                            <p>
                                El Sitio se proporciona "tal cual" y "según disponibilidad". Revista Nómada no garantiza
                                que el Sitio esté libre de errores, virus o interrupciones. No garantizamos la exactitud,
                                integridad o actualidad de la información publicada.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>8. Limitación de Responsabilidad</h2>
                            <p>
                                En la medida máxima permitida por la ley, Revista Nómada no será responsable de daños
                                directos, indirectos, incidentales, especiales o consecuentes derivados del uso o la
                                imposibilidad de usar el Sitio, incluyendo pero no limitado a:
                            </p>
                            <ul>
                                <li>Pérdida de datos o información</li>
                                <li>Pérdida de beneficios o ingresos</li>
                                <li>Interrupción del negocio</li>
                                <li>Daños a la reputación</li>
                            </ul>
                        </section>

                        <section className="legal-section">
                            <h2>9. Indemnización</h2>
                            <p>
                                Usted acepta indemnizar y mantener indemne a Revista Nómada, sus directores, empleados
                                y colaboradores de cualquier reclamo, pérdida, responsabilidad, daño o gasto (incluyendo
                                honorarios de abogados) que surjan de su uso del Sitio o violación de estos Términos de Uso.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>10. Modificaciones a los Términos</h2>
                            <p>
                                Nos reservamos el derecho de modificar estos Términos de Uso en cualquier momento.
                                Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio.
                                Su uso continuado del Sitio después de dichas modificaciones constituye su aceptación
                                de los nuevos términos.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>11. Ley Aplicable y Jurisdicción</h2>
                            <p>
                                Estos Términos de Uso se rigen por las leyes de los Estados Unidos Mexicanos.
                                Cualquier disputa relacionada con estos términos será resuelta en los tribunales
                                competentes del estado de Morelos, México.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>12. Separabilidad</h2>
                            <p>
                                Si alguna disposición de estos Términos de Uso se considera inválida o inaplicable,
                                dicha disposición será eliminada sin afectar la validez del resto de los términos.
                            </p>
                        </section>

                        <section className="legal-section">
                            <h2>13. Contacto</h2>
                            <p>
                                Para preguntas o comentarios sobre estos Términos de Uso, puede contactarnos en:
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

export default TermsOfUse;
