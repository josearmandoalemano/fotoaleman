import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSTAGRAM_URL = 'https://www.instagram.com/fiturmadrid/';
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DATA_FILE = path.join(__dirname, '../src/data/mexico_feed.json');

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

(async () => {
    console.log('🚀 Iniciando actualización de Fitur (Notas México)...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=es-ES,es']
    });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1280, height: 800 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        console.log(`🌍 Navegando a ${INSTAGRAM_URL}...`);
        await page.goto(INSTAGRAM_URL, { waitUntil: 'networkidle2' });

        try {
            const closeButtonSelector = 'div[role="button"][aria-label="Cerrar"], svg[aria-label="Cerrar"]';
            await page.waitForSelector(closeButtonSelector, { timeout: 5000 });
            await page.click(closeButtonSelector);
            console.log('✅ Popup de login cerrado.');
        } catch (e) {
            console.log('ℹ️ No se detectó popup de login o no se pudo cerrar (continuando...)');
        }

        console.log('⏳ Esperando a que carguen los posts...');
        await page.waitForSelector('article a', { timeout: 10000 });

        const posts = await page.evaluate(() => {
            const anchors = Array.from(document.querySelectorAll('article a')).slice(0, 3);
            return anchors.map((a, index) => {
                const img = a.querySelector('img');
                const alt = img ? (img.alt || '') : '';

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
                    cleanTitle = "Novedades de la Feria Internacional de Turismo ✨";
                }

                if (cleanTitle.length > 100) {
                    cleanTitle = cleanTitle.substring(0, 97) + '...';
                }

                return {
                    id: `fitur-${index + 1}`,
                    title: cleanTitle,
                    link: a.href,
                    rubric: 'MÉXICO',
                    imageUrl: img ? img.src : null
                };
            });
        });

        console.log(`✅ Encontrados ${posts.length} posts.`);

        const feedData = [];

        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            const localImageInfo = `mexico_latest_${i + 1}.jpg`;
            const localImagePath = path.join(ASSETS_DIR, localImageInfo);

            console.log(`⬇️ Descargando imagen ${i + 1}: ${post.imageUrl ? 'OK' : 'MISSING'}`);

            if (post.imageUrl) {
                try {
                    await downloadImage(post.imageUrl, localImagePath);
                } catch (err) {
                    console.error(`   ❌ Error descargando imagen: ${err.message}`);
                }
            }

            feedData.push({
                id: post.id,
                title: post.title,
                link: post.link,
                rubric: post.rubric
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
