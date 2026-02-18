import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INSTAGRAM_URL = 'https://www.instagram.com/meggiesalgadop/';
const ASSETS_DIR = path.join(__dirname, '../src/assets');
const DATA_FILE = path.join(__dirname, '../src/data/meggie_feed.json');

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
    console.log('🚀 Iniciando actualización de Instagram (Meggie Salgado)...');
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
                // Try to get alt text, or fallback
                let alt = img ? (img.alt || '') : '';
                // Clean up alt text to be a good title
                let rawTitle = alt || '';

                // Remove common Instagram auto-generated prefixes
                let cleanTitle = rawTitle
                    .replace(/^Photo by .+? in .+?(\.|$)/, '') // Remove "Photo by X in Y."
                    .replace(/^Photo by .+?(\.|$)/, '')       // Remove "Photo by X."
                    .replace(/^Photo shared by .+?(\.|$)/, '') // Remove "Photo shared by X."
                    .replace(/^Reel by .+?(\.|$)/, '')         // Remove "Reel by X."
                    .replace(/May be an image of.*$/, '')      // Remove AI image descriptions
                    .trim();

                // If cleaning removed everything or it was empty, use a fallback
                if (!cleanTitle || cleanTitle.length < 5) {
                    cleanTitle = "Mira la última actualización de Meggie Salgado ✨";
                }

                // Truncate if too long
                if (cleanTitle.length > 80) {
                    cleanTitle = cleanTitle.substring(0, 77) + '...';
                }

                // Determine rubric based on href (reel vs post) or just generic
                const href = a.href;
                let rubric = 'MEGGIE SALGADO';


                return {
                    id: `meggie-${index + 1}`, // Keep IDs consistent
                    title: cleanTitle,
                    link: href, // Allow absolute URL
                    rubric: rubric,
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
            const localImageInfo = `meggie_latest_${i + 1}.webp`; // Saving directly as webp for consistency if possible, but validation might need jpg. Using jpg to match logic. 
            // Wait, previous used jpg. Let's use jpg download then convert or just save. The previous script saved as jpg but imported as jpg in json? No, previous script imported webp.
            // Let's save as jpg, and the build process or just manual convert. 
            // Actually, the previous script `update_instagram.js` saved as `insta_latest_${i + 1}.jpg` but the imports in React were `.webp`. 
            // This suggests there is a conversion step OR I should see if I can save as webp directly if source allows, or just save as jpg and I'll convert it.
            // I will save as .jpg as per previous script logic to be safe, then I'll run my convert script.

            const localImageInfoJpg = `meggie_latest_${i + 1}.jpg`;
            const localImagePath = path.join(ASSETS_DIR, localImageInfoJpg);

            console.log(`⬇️ Descargando imagen ${i + 1}: ${post.imageUrl ? 'OK' : 'MISSING'}`);

            if (post.imageUrl) {
                try {
                    await downloadImage(post.imageUrl, localImagePath);
                    console.log(`   📸 Guardada en: src/assets/${localImageInfoJpg}`);
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
