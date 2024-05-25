import fetch from 'node-fetch';
import fs from 'fs';
import AdmZip from 'adm-zip';

/**
 * Downloads a file from a URL and returns the path to the saved file.
 * @param {string} url URL of the file to download.
 * @param {string} outputPath Path to save the downloaded file.
 */
async function downloadFile(url, outputPath) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to download: ${response.statusText}`);

	const dest = fs.createWriteStream(outputPath);
	response.body.pipe(dest);

	return new Promise((resolve, reject) => {
		dest.on('finish', resolve);
		dest.on('error', reject);
	});
}

/**
 * Extracts a ZIP file to a specified directory.
 * @param {string} zipPath Path to the ZIP file.
 * @param {string} extractPath Path to extract the ZIP contents.
 */
function extractZip(zipPath, extractPath) {
	const zip = new AdmZip(zipPath);
	zip.extractAllTo(extractPath, true);
}

/**
 * Deletes a file from the filesystem.
 * @param {string} filePath Path to the file to be deleted.
 */
function deleteFile(filePath) {
	return new Promise((resolve, reject) => {
		fs.unlink(filePath, err => {
			if (err) reject(err);
			else resolve();
		});
	});
}

/**
 * Handles the process of downloading, extracting, and optionally cleaning up a ZIP file.
 * @param {string} downloadURL URL of the file to download.
 * @param {string} outputPath Path to save the downloaded ZIP file.
 * @param {string} extractPath Path to extract the ZIP contents.
 * @param {boolean} cleanup Whether to delete the ZIP file after extraction.
 */
async function downloadAndExtract(downloadURL, outputPath, extractPath, cleanup = true) {
	try {
		await downloadFile(downloadURL, outputPath);
		console.log('Download completed, starting extraction.');
		extractZip(outputPath, extractPath);
		console.log('Extraction successful.');

		if (cleanup) {
			await deleteFile(outputPath);
			console.log('ZIP file deleted successfully.');
		}
	} catch (err) {
		console.error('Error during file handling:', err);
	}
}

export default downloadAndExtract;
