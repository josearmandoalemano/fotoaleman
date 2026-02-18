import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORTUR_URL = 'https://www.reportur.com/';
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DATA_FILE = path.join(__dirname, '../src/data/reportur_feed.json');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : require('http');

        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

(async () => {
    console.log('🚀 Iniciando actualización de Reportur...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log(`🌍 Navegando a ${REPORTUR_URL}...`);
        await page.goto(REPORTUR_URL, { waitUntil: 'networkidle2' });

        console.log('⏳ Extrayendo artículos...');

        const articles = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.cont-post')).slice(0, 3);
            return items.map((item, index) => {
                const titleLink = item.querySelector('.postTitle-apertura a, .postTitle a');
                const imgElem = item.querySelector('img.wp-post-image');

                const title = titleLink ? titleLink.innerText.trim() : 'Noticia Reportur';
                const link = titleLink ? titleLink.href : '#';
                const imageUrl = imgElem ? imgElem.src : null;

                return {
                    id: `reportur-${index + 1}`,
                    title: title,
                    link: link,
                    rubric: 'TURISMO',
                    imageUrl: imageUrl
                };
            });
        });

        console.log(`✅ Encontrados ${articles.length} artículos.`);

        const feedData = [];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const localImageInfo = `reportur_latest_${i + 1}.jpg`;
            const localImagePath = path.join(ASSETS_DIR, localImageInfo);

            console.log(`⬇️ Procesando artículo ${i + 1}: ${article.title.substring(0, 20)}...`);

            if (article.imageUrl) {
                try {
                    console.log(`   📸 Descargando imagen: ${article.imageUrl}`);
                    await downloadImage(article.imageUrl, localImagePath);
                } catch (err) {
                    console.error(`   ❌ Error descargando imagen: ${err.message}`);
                }
            }

            feedData.push({
                id: article.id,
                title: article.title,
                link: article.link,
                rubric: article.rubric,
                image: localImageInfo // Assuming frontend can use this relative path or needs logic
            });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(feedData, null, 2));
        console.log(`💾 Datos guardados en ${DATA_FILE}`);

    } catch (error) {
        console.error('❌ Error fatal en el script:', error);
    } finally {
        await browser.close();
        console.log('👋 Navegador cerrado.');
    }
})();
