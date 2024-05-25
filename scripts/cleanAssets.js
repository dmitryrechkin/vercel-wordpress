import deleteUnminifiedAssets from './deleteUnminifiedAssets.js';

const wordpressPath = './wordpress/wp-content/';
const extensionsToCheck = ['.js', '.css'];

if (!process.env.WP_DEBUG) {
	deleteUnminifiedAssets(wordpressPath, extensionsToCheck);
} else {
	console.log('WP_DEBUG is set, keeping unminified files.');
}
