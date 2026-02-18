import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSTAGRAM_URL = 'https://www.instagram.com/danielaltafi/';
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DATA_FILE = path.join(__dirname, '../src/data/instagram_feed.json');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

(async () => {
    console.log('🚀 Iniciando actualización de Instagram...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=es-ES,es']
    });
    const page = await browser.newPage();

    try {
        // Set viewport and user agent to look like a real desktop browser
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log(`🌍 Navegando a ${INSTAGRAM_URL}...`);
        await page.goto(INSTAGRAM_URL, { waitUntil: 'networkidle2' });

        // Try to close login popup if it appears
        try {
            const closeButtonSelector = 'div[role="button"][aria-label="Cerrar"], svg[aria-label="Cerrar"]';
            await page.waitForSelector(closeButtonSelector, { timeout: 5000 });
            await page.click(closeButtonSelector);
            console.log('✅ Popup de login cerrado.');
        } catch (e) {
            console.log('ℹ️ No se detectó popup de login o no se pudo cerrar (continuando...)');
        }

        // Wait for articles (posts) to load
        console.log('⏳ Esperando a que carguen los posts...');
        await page.waitForSelector('article a', { timeout: 10000 });

        // Extract data from the first 3 posts
        const posts = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('article a')).slice(0, 3);
            return anchors.map((a, index) => {
                const img = a.querySelector('img');
                const alt = img ? (img.alt || '') : '';

                // Better cleaning logic
                let cleanTitle = alt
                    // Improved regexes to handle "Photo by X on DATE." prefix correctly
                    .replace(/^Photo by .+? on .*?(\.|$)/, '')
                    .replace(/^Photo by .+?(\.|$)/, '')
                    .replace(/^Photo shared by .+?(\.|$)/, '')
                    .replace(/^Reel by .+?(\.|$)/, '')
                    .replace(/^Video by .+?(\.|$)/, '')
                    .replace(/May be an image of.*$/, '')
                    .replace(/May be a.*$/, '')
                    .replace(/^.*? on Instagram:.*?"/, '')
                    .replace(/"$/, '')
                    .trim();

                if (!cleanTitle || cleanTitle.length < 5 || cleanTitle.includes('on Instagram:')) {
                    // Try to provide a more specific fallback if possible, or stick to generic
                    cleanTitle = "Mira nuestra última actualización en Instagram ✨";
                }

                if (cleanTitle.length > 100) {
                    cleanTitle = cleanTitle.substring(0, 97) + '...';
                }

                return {
                    id: `reel-${index + 1}`,
                    title: cleanTitle,
                    link: a.href,
                    rubric: 'MORELOS',
                    imageUrl: img ? img.src : null
                };
            });
        });

        console.log(`✅ Encontrados ${posts.length} posts.`);

        if (posts.length === 0) {
            throw new Error('No se encontraron posts. Verifica los selectores o el bloqueo de Instagram.');
        }

        const feedData = [];

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const localImageInfo = `insta_latest_${i + 1}.jpg`;
            const localImagePath = path.join(ASSETS_DIR, localImageInfo);

            console.log(`⬇️ Descargando imagen ${i + 1}: ${post.imageUrl ? 'OK' : 'MISSING'}`);

            if (post.imageUrl) {
                try {
                    await downloadImage(post.imageUrl, localImagePath);
                    console.log(`   📸 Guardada en: src/assets/${localImageInfo}`);
                } catch (err) {
                    console.error(`   ❌ Error descargando imagen: ${err.message}`);
                    // Keep existing image if download fails, or copy generic placeholder?
                    // For now, assume existing image acts as fallback if download fails.
                }
            }

            feedData.push({
                id: post.id,
                title: post.title,
                link: post.link,
                rubric: post.rubric
                // We don't store local path in JSON because we'll import them statically in React
                // based on ID or index convention.
            });
        }

        // Save JSON
        fs.writeFileSync(DATA_FILE, JSON.stringify(feedData, null, 2));
        console.log(`💾 Datos guardados en ${DATA_FILE}`);

    } catch (error) {
        console.error('❌ Error fatal en el script:', error);
    } finally {
        await browser.close();
        console.log('👋 Navegador cerrado.');
    }
})();
