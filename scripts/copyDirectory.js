import fs from 'fs/promises';
import path from 'path';

async function copyDirectory(src, dest) {
	try {
		// Ensure the destination directory exists
		await fs.mkdir(dest, { recursive: true });

		// Get all the files and directories within the source
		let entries = await fs.readdir(src, { withFileTypes: true });

		// Loop through each entry
		for (let entry of entries) {
			// Full path for both src and dest
			let srcPath = path.join(src, entry.name);
			let destPath = path.join(dest, entry.name);

			// If the entry is a directory, recurse the copy operation
			if (entry.isDirectory()) {
				await copyDirectory(srcPath, destPath);
			} else {
				// If the entry is a file, perform the copy
				await fs.copyFile(srcPath, destPath);
			}
		}
		console.log(`Copied ${src} to ${dest}`);
	} catch (err) {
		console.error(`Error copying directory from ${src} to ${dest}:`, err);
	}
}

export default copyDirectory;