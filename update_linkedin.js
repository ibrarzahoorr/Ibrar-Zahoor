const fs = require('fs');
const path = require('path');

const BASE_DIR = 'c:/Users/ibrar/Downloads/Ibrar Zahoor/Ibrar-Zahoor';
const OLD_URL = 'https://www.linkedin.com/in/ibrarzahoorr/';
const NEW_URL = 'https://www.linkedin.com/in/ibrarzahoorr/';

function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html') || file.endsWith('.js')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

function run() {
    const allFiles = getFiles(BASE_DIR);
    console.log(`Found ${allFiles.length} HTML/JS files. Updating...`);

    let updatedCount = 0;

    for (const file of allFiles) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Use regex with global flag to replace all occurrences
        const regex = new RegExp(OLD_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        
        if (regex.test(content)) {
            content = content.replace(regex, NEW_URL);
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }

    console.log(`Successfully updated LinkedIn URL in ${updatedCount} files.`);
}

run();
