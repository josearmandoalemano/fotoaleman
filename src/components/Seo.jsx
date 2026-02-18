import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, image, url, type = 'website' }) => {
    const siteTitle = 'Revista Nómada - Experiencias de Viaje y Gastronomía';
    const fullTitle = title ? `${title} | Revista Nómada` : siteTitle;
    const siteUrl = 'https://revistanomada.com'; // Replace with actual domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
    const defaultImage = `${siteUrl}/logo.png`; // Fallback image if available, or leave empty
    const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph tags (Facebook, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content="Revista Nómada" />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
};

export default Seo;
