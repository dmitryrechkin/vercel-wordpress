import fs from 'fs';
import path from 'path';

/**
 * Recursively delete a directory and its contents.
 * @param {string} dirPath - Path of the directory to delete.
 */
function deleteDirectory(dirPath) {
	if (fs.existsSync(dirPath)) {
	  fs.readdirSync(dirPath).forEach(file => {
		const curPath = path.join(dirPath, file);
		if (fs.lstatSync(curPath).isDirectory()) {
		  // Recurse into a subdirectory
		  deleteDirectoryRecursive(curPath);
		} else {
		  // Delete file
		  fs.unlinkSync(curPath);
		}
	  });
	  fs.rmdirSync(dirPath);
	  console.log(`Deleted directory: ${dirPath}`);
	} else {
	  console.log(`Directory not found: ${dirPath}`);
	}
}

export default deleteDirectory;