import fs from 'fs';
import downloadAndExtract from './downloadAndExtract.js';

const themesFile = 'themes.txt';
const outputPathBase = './wordpress/wp-content/themes/';
const extractPathBase = './wordpress/wp-content/themes/';

fs.readFileSync(themesFile, 'utf-8').split('\n').forEach(async themeUrl => {
	if (themeUrl.trim()) {
		const fileName = themeUrl.split('/').pop();
		const outputPath = `${outputPathBase}${fileName}`;
		await downloadAndExtract(themeUrl, outputPath, extractPathBase)
			.then(() => console.log(`${fileName} theme setup complete.`))
			.catch(err => console.error(`${fileName} theme setup failed:`, err));
	}
});
