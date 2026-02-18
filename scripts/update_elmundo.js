import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ELMUNDO_URL = 'https://www.elmundo.es/internacional.html';
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DATA_FILE = path.join(__dirname, '../src/data/elmundo_feed.json');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        // Handle both http and https
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
    console.log('🚀 Iniciando actualización de El Mundo...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log(`🌍 Navegando a ${ELMUNDO_URL}...`);
        await page.goto(ELMUNDO_URL, { waitUntil: 'networkidle2' });

        // Accept cookies if needed (often elmundo has a CMP)
        try {
            const acceptBtn = await page.waitForSelector('#didomi-notice-agree-button', { timeout: 3000 });
            if (acceptBtn) {
                await acceptBtn.click();
                console.log('✅ Cookies aceptadas.');
            }
        } catch (e) {
            // Ignore if no cookie banner
        }

        console.log('⏳ Extrayendo artículos...');
        // Selectors identified: article.ue-c-cover-content, a.ue-c-cover-content__link, img.ue-c-cover-content__image

        const articles = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('article.ue-c-cover-content')).slice(0, 3);
            return items.map((item, index) => {
                const linkElem = item.querySelector('a.ue-c-cover-content__link');
                const imgElem = item.querySelector('img.ue-c-cover-content__image');

                let title = linkElem ? linkElem.innerText.trim() : 'Noticia Internacional';
                const link = linkElem ? linkElem.href : '#';
                const imageUrl = imgElem ? (imgElem.src || imgElem.getAttribute('data-src')) : null;

                return {
                    id: `mundo-${index + 1}`,
                    title: title,
                    link: link,
                    rubric: 'MUNDO',
                    imageUrl: imageUrl
                };
            });
        });

        console.log(`✅ Encontrados ${articles.length} artículos.`);

        const feedData = [];

        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const localImageInfo = `mundo_latest_${i + 1}.jpg`;
            const localImagePath = path.join(ASSETS_DIR, localImageInfo);

            console.log(`⬇️ Procesando artículo ${i + 1}: ${article.title.substring(0, 20)}...`);

            if (article.imageUrl) {
                try {
                    console.log(`   📸 Descargando imagen: ${article.imageUrl}`);
                    await downloadImage(article.imageUrl, localImagePath);
                } catch (err) {
                    console.error(`   ❌ Error descargando imagen: ${err.message}`);
                    // Fallback or ignore
                }
            }

            feedData.push({
                id: article.id,
                title: article.title,
                link: article.link,
                rubric: article.rubric
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
