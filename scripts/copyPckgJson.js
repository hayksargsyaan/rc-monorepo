const fs = require('fs');
const path = require('path');

const foldersToSkip = ['node_modules', 'dist'];
const PACKAGE_JSON = 'package.json';

const packagesMap = root => {
  fs.readdir(root, (err, subFiles) => {
    if (err) console.log(err);

    if (!!subFiles.length && subFiles.includes(PACKAGE_JSON)) {
      copyFile(root);
    }

    subFiles.forEach(file => {
      if (foldersToSkip.includes(file)) return;
      const fullPath = path.join(root, file);
      fs.stat(fullPath, (err, stats) => {
        if (!err) {
          if (stats.isDirectory()) {
            packagesMap(fullPath);
          }
        } else console.log(err);
      });
    });
  });
};

const copyFile = root => {
  fs.copyFileSync(
    path.join(root, PACKAGE_JSON),
    path.join(root, 'dist', PACKAGE_JSON),
  );
};

const root = path.join(__dirname, '..', 'packages');
packagesMap(root);

console.log('Files successfully has been copied!');
