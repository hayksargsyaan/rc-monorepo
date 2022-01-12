const path = require('path');
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config) => {
    // config.resolve.alias['#'] = path.resolve(__dirname, '../src')
    config.resolve.alias['atoms'] = path.resolve(__dirname, '../packages/atoms');
    return config;
  }

}
