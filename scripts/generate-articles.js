import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/content/articles');
const outputHeader = `// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Modifica los archivos en src/content/articles/ para actualizar

`;

// Helper to get formatted date
const getToday = () => new Date().toISOString().split('T')[0];

try {
    // Ensure dir exists
    if (!fs.existsSync(articlesDir)) {
        console.error('Directory src/content/articles does not exist.');
        process.exit(1);
    }

    const folders = fs.readdirSync(articlesDir)
        .filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory())
        .sort(); // Ensure order

    const imports = [];
    const articleObjects = [];

    folders.forEach((folder, index) => {
        const folderPath = path.join(articlesDir, folder);

        // Read Meta
        let meta = {};
        try {
            meta = JSON.parse(fs.readFileSync(path.join(folderPath, 'meta.json'), 'utf8'));
        } catch (e) {
            console.error(`Error reading meta.json in ${folder}`, e);
            return;
        }

        // Read Body
        let body = '';
        try {
            body = fs.readFileSync(path.join(folderPath, 'body.html'), 'utf8');
            // Escape backticks for JS template string
            body = body.replace(/`/g, '\\`').replace(/\$/g, '\\$');
        } catch (e) {
            console.error(`Error reading body.html in ${folder}`, e);
        }

        // Check for images
        const files = fs.readdirSync(folderPath);

        // Priority for Main Image: webp > jpg > jpeg > png
        const extensions = ['webp', 'jpg', 'jpeg', 'png'];
        let mainImage = null;
        for (const ext of extensions) {
            const candidate = files.find(f => f === `image.${ext}`);
            if (candidate) {
                mainImage = candidate;
                break;
            }
        }

        // Gallery Images - Group by base name and prefer webp
        // Regex to match gallery_NAME.EXT
        const galleryRegex = /^gallery_(.+)\.(webp|jpg|jpeg|png)$/;
        const galleryFiles = files.filter(f => galleryRegex.test(f));

        // Map to store best version of each gallery item
        // Key: gallery_base_name (e.g. "gallery_01"), Value: filename
        const galleryMap = new Map();

        galleryFiles.forEach(file => {
            const match = file.match(galleryRegex);
            const baseName = match[1];
            const ext = match[2];

            if (!galleryMap.has(baseName)) {
                galleryMap.set(baseName, file);
            } else {
                // If we already have a file, check if current is webp and existing is not
                const existingFile = galleryMap.get(baseName);
                if (ext === 'webp' && !existingFile.endsWith('.webp')) {
                    galleryMap.set(baseName, file);
                }
            }
        });

        // Convert map values back to sorted array
        const galleryImages = Array.from(galleryMap.values()).sort();

        const importName = `article_${index}`;

        // Generate Imports for Images
        let mainImageImport = 'null';
        if (mainImage) {
            imports.push(`import img_${index}_main from '../content/articles/${folder}/${mainImage}';`);
            mainImageImport = `img_${index}_main`;
        } else if (meta.image) {
            mainImageImport = `"${meta.image}"`; // Keep URL if no local file
        }

        // Check for Cover Images (cover_01.jpg, cover_02.jpg, etc.)
        const coverRegex = /^cover_(.+)\.(webp|jpg|jpeg|png)$/;
        const coverFiles = files.filter(f => coverRegex.test(f)).sort();

        const coverImports = [];
        coverFiles.forEach((cImg, cIdx) => {
            const cVar = `img_${index}_cover_${cIdx}`;
            imports.push(`import ${cVar} from '../content/articles/${folder}/${cImg}';`);
            coverImports.push(cVar);
        });

        // If no main image found but covers exist, use first cover as main image
        if (mainImageImport === 'null' && coverImports.length > 0) {
            mainImageImport = coverImports[0];
        }

        let galleryImports = [];
        galleryImages.forEach((gImg, gIdx) => {
            const gVar = `img_${index}_gal_${gIdx}`;
            imports.push(`import ${gVar} from '../content/articles/${folder}/${gImg}';`);
            galleryImports.push(gVar);
        });

        // Construct Object
        articleObjects.push(`
    {
        ...${JSON.stringify(meta)},
        id: ${meta.id || index + 1},
        content: \`${body}\`,
        image: ${mainImageImport},
        covers: [${coverImports.join(', ')}],
        gallery: [${galleryImports.join(', ')}]
    }`);
    });

    const fileContent = `${outputHeader}
${imports.join('\n')}

export const articles = [
${articleObjects.join(',')}
];
`;

    fs.writeFileSync(path.join(__dirname, '../src/data/articles.js'), fileContent);
    console.log(`Success! Generated data for ${folders.length} articles.`);

} catch (err) {
    console.error('Build failed:', err);
}
