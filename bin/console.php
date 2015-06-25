#!/usr/bin/env php
<?php

// get MODE from environment, REDIRECT_MODE for cgi based deployment
define('MODE', (getenv('MODE') ? getenv('MODE') : ((getenv('REDIRECT_MODE')) ? getenv('REDIRECT_MODE') : 'production')));
define('PATH', dirname(__DIR__));

/** @var \Composer\Autoload\ClassLoader $autoloader */
$autoloader = require PATH . '/vendor/autoload.php';
$autoloader->addPsr4('My\\', __DIR__ . '/../src');

// application
$app = new Distill\Application();
$app->register(new \Distill\Module\CliErrorModule());

$app->addCallback('Application.PreRoute', function () { echo 'Application CLI' . PHP_EOL . '---------------' . PHP_EOL; });
$app->addCallback('Application.PostDispatch', function () { echo "\n"; });

$app['home'] = ['$ hi :name', function($name) {
    echo 'hello, ' . $name . ' from the CLI!';
}];

$app['hello-name'] = ['$ hi', function() {
    echo 'hello world from the CLI!';
}];

$app->run();