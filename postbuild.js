/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const { listFiles } = require('fs-directory');

const srcPath = path.resolve(process.cwd(), 'src');
const distPath = path.resolve(process.cwd(), 'dist');

listFiles(srcPath, {
    fileFilter: (file) => file.name.endsWith('.txt'),
    directoryFilter: () => true,
}).forEach((file) => {
    const dest = file.replaceAll(srcPath, distPath);
    fs.copyFileSync(file, dest);
});
