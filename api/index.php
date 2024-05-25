<?php

define('SOURCE_PATH', __DIR__ . '/../wordpress/');

// ABSPATH is used by wordpress to determine the path to the wordpress directory
define('ABSPATH', '/tmp/wordpress/');

// Vercel's file system is read only but wordpress needs to be able to write to the file system
// so we copy the wordpress directory to a temporary directory
if (!file_exists(ABSPATH)) {
	function vercelCopyDirectory(string $src, string $dst): void
	{
		$dir = opendir($src);
		@mkdir($dst);
		while (false !== ($file = readdir($dir))) {
			if (($file != '.') && ($file != '..')) {
				if (is_dir($src . '/' . $file)) {
					vercelCopyDirectory($src . '/' . $file, $dst . '/' . $file);
				} else {
					copy($src . '/' . $file, $dst . '/' . $file);
				}
			}
		}
		closedir($dir);
	}

	vercelCopyDirectory(SOURCE_PATH, ABSPATH);
}

$requestFile = $_SERVER['PHP_SELF'];
$filePath = ABSPATH . $requestFile;

// server static files directly
if (file_exists($filePath) && is_file($filePath) && !preg_match('/\.php$/', $filePath)) {
	// Serve the static file directly
	$mimeType = mime_content_type($filePath);
	header("Content-Type: $mimeType");
	readfile($filePath);
	exit;
}

// if it is a folder and it exists then redirect to the index.php inside that folder
if (is_dir($filePath) && file_exists($filePath . '/index.php')) {
	$filePath = $filePath . '/index.php';
}
// fallback to index.php
else if (!file_exists($filePath) || !is_file($filePath) || !preg_match('/\.php$/', $filePath)) {
	$filePath = ABSPATH . 'index.php';
}

require_once realpath($filePath);