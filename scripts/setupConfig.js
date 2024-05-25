import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Getting the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.join(__dirname, '../src/wp-config.php');
const destPath = path.join(__dirname, '../wordpress/wp-config.php');

// Function to copy file
function copyFile(source, destination) {
	fs.copyFile(source, destination, (err) => {
		if (err) {
			console.error('Error occurred while copying wp-config.php:', err);
			return;
		}
		console.log('wp-config.php copied successfully to', destination);
	});
}

// Call the function
copyFile(srcPath, destPath);
