import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ARTICLES_PATH = path.join(__dirname, '../src/data/articles.js');
const PUBLIC_PATH = path.join(__dirname, '../public/sitemap.xml');
const BASE_URL = 'https://revistanomada.com';

const generateSitemap = async () => {
    try {
        const fileContent = fs.readFileSync(ARTICLES_PATH, 'utf-8');

        // Regex to extract article objects (simplified)
        // This relies on the structure: { ...{"id":1, ...}, id: 1, ... } or similar
        // We look for the "hash object" pattern which contains the metadata
        const articleRegex = /\{\s*\.\.\.\{"id":(\d+)[^}]*?\}\s*,/g;

        const urls = [];

        // Basic static pages
        urls.push(`${BASE_URL}/`);
        urls.push(`${BASE_URL}/gastronomy`);
        urls.push(`${BASE_URL}/search`);
        urls.push(`${BASE_URL}/politicas-privacidad`);
        urls.push(`${BASE_URL}/terminos-uso`);

        // Add categories (hardcoded based on mapping in CategoryPage.jsx for now, or extracted)
        const categories = [
            "Distrito Lujo", "Coordenada Secreta", "TechTravel", "Sabores de Morelos",
            "Melatte Social", "Raíces", "Turismo de salud y bienestar",
            "Turismo idiomático", "Plan Familiar", "Guía Práctica", "Turismo deportivo",
            "Destinos", "Explora", "Saborea", "Descansa"
        ];
        categories.forEach(cat => {
            urls.push(`${BASE_URL}/category/${encodeURIComponent(cat)}`);
        });

        // Extract Articles
        let match;
        while ((match = articleRegex.exec(fileContent)) !== null) {
            const id = match[1];
            urls.push(`${BASE_URL}/article/${id}`);
        }

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

        fs.writeFileSync(PUBLIC_PATH, sitemapContent);
        console.log(`Sitemap generated with ${urls.length} URLs at ${PUBLIC_PATH}`);

    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};

generateSitemap();
