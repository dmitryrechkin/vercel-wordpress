import fs from 'fs';
import downloadAndExtract from './downloadAndExtract.js';

const pluginsFile = 'plugins.txt';
const outputPathBase = './wordpress/wp-content/plugins/';
const extractPathBase = './wordpress/wp-content/plugins/';

fs.readFileSync(pluginsFile, 'utf-8').split('\n').forEach(async pluginUrl => {
	if (pluginUrl.trim()) {
		const fileName = pluginUrl.split('/').pop();
		const outputPath = `${outputPathBase}${fileName}`;
		await downloadAndExtract(pluginUrl, outputPath, extractPathBase)
			.then(() => console.log(`${fileName} plugin setup complete.`))
			.catch(err => console.error(`${fileName} plugin setup failed:`, err));
	}
});
