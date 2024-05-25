import copyDirectory from './copyDirectory.js';

const srcDirectory = './src/mu-plugins';
const destDirectory = './wordpress/wp-content/mu-plugins';

copyDirectory(srcDirectory, destDirectory);
