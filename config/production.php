<?php

$productionConfig = [
];

return array_replace_recursive(include __DIR__ . '/common.php', $productionConfig);
