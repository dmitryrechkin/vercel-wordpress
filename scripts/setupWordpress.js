import downloadAndExtract from './downloadAndExtract.js';

const wordpressURL = "https://wordpress.org/latest.zip";
const outputPath = "./wordpress.zip";
const extractPath = './';

downloadAndExtract(wordpressURL, outputPath, extractPath)
	.then(() => console.log('WordPress setup complete.'))
	.catch(err => console.error('WordPress setup failed:', err));
