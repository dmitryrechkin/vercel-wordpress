import fs from 'fs';
import path from 'path';

/**
 * Checks if a minified version of the file exists.
 * @param {string} filePath Path to the unminified file.
 * @param {string} extension File extension (.js or .css).
 * @returns {boolean} True if the minified file exists, false otherwise.
 */
export function hasMinifiedVersion(filePath, extension) {
	const minifiedPath = filePath.replace(extension, `.min${extension}`);
	return fs.existsSync(minifiedPath);
}

/**
 * Deletes unminified assets from the specified directory.
 * @param {string} directory Path to the directory to scan for unminified files.
 * @param {string[]} extensions Array of file extensions to check (.js, .css, etc.).
 */
export default function deleteUnminifiedAssets(directory, extensions) {
	fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
		const fullPath = path.join(directory, dirent.name);

		if (dirent.isDirectory()) {
			deleteUnminifiedAssets(fullPath, extensions);
		} else {
			extensions.forEach(extension => {
				if (fullPath.endsWith(extension) && !fullPath.endsWith(`.min${extension}`) && hasMinifiedVersion(fullPath, extension)) {
					fs.unlink(fullPath, err => {
						if (err) {
							console.error(`Failed to delete ${fullPath}:`, err);
						} else {
							console.log(`Deleted ${fullPath}`);
						}
					});
				}
			});
		}
	});
}
