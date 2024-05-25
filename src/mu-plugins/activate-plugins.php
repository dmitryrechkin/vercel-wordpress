<?php

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

$pluginsToActivate = [
	'tidb-compatibility/tidb-compatibility.php',
];

foreach ($pluginsToActivate as $plugin) {
	if (!is_plugin_active($plugin)) {
		activate_plugin($plugin);
	}
}
