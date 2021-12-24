// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const { npm_config_name, npm_config_path } = process.env;
const componentsPath = path.join(__dirname, '..', npm_config_path);

const currentComponentPath = path.join(componentsPath, npm_config_name);
const currentPackageJsonPath = path.join(currentComponentPath, 'package.json');

const componentTemplate = `import React from 'react';

function ${npm_config_name}() {
  const content = 'This is ${npm_config_name} component';
  return (
    <p>{content}</p>
  );
}

export default ${npm_config_name};
`;

const indexTemplate = `export { default as ${npm_config_name} } from './${npm_config_name}';
export default {};
`;

const stylesTemplate = `import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({

});

export default useStyles;
`;

const packageJson = {
  name: `@thedesignsystem/${npm_config_name}`,
  publishConfig: {
    directory: 'dist',
  },
  license: 'MIT',
  types: 'dist/index.d.ts',
  main: 'index.ts',
  scripts: {
    build:
      'cross-env webpack --config ../../../webpack.config.js --mode production',
    test: `jest ${npm_config_name.toLowerCase()} --config=../../../jest.config.js`,
    'test:watch': `jest ${npm_config_name.toLowerCase()} --config=../../../jest.config.js --watch`,
    clean: 'rm -rf dist && rm -rf node_modules && rm -rf package-lock.json',
  },
};

const removeLibFolder = () => {
  try {
    fs.rmSync(path.join(currentComponentPath, 'lib'), { recursive: true });
  } catch (error) {
    throw new Error(error);
  }
};

const updateVersion = () => {
  try {
    const data = fs.readFileSync(
      path.join(currentComponentPath, 'package.json'),
    );
    packageJson.version = JSON.parse(data).version;
  } catch (error) {
    throw new Error(error);
  }
};

const updatePeerDependencies = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'package.json'));
    packageJson.peerDependencies = {
      ...JSON.parse(data).peerDependencies,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const writePackageJson = () => {
  try {
    fs.writeFileSync(currentPackageJsonPath, JSON.stringify(packageJson));
  } catch (error) {
    throw new Error(error);
  }
};

const createFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
  } catch (e) {
    throw new Error(e);
  }
};

removeLibFolder();
updateVersion();
updatePeerDependencies();
writePackageJson();
createFile(
  path.join(currentComponentPath, `${npm_config_name}.tsx`),
  componentTemplate,
);
createFile(path.join(currentComponentPath, 'index.ts'), indexTemplate);
createFile(path.join(currentComponentPath, 'types.ts'), '');
createFile(path.join(currentComponentPath, 'styles.ts'), stylesTemplate);
