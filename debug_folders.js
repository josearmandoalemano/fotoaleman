import fs from 'fs';
import path from 'path';

const articlesDir = './src/content/articles';
const folders = fs.readdirSync(articlesDir)
    .filter(f => fs.statSync(path.join(articlesDir, f)).isDirectory())
    .sort();

console.log('Folders found:', folders);

folders.forEach(folder => {
    const metaPath = path.join(articlesDir, folder, 'meta.json');
    if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        console.log(`${folder}: ID ${meta.id}`);
    } else {
        console.log(`${folder}: No meta.json`);
    }
});
