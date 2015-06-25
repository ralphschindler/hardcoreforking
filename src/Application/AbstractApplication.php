<?php

namespace HardcoreForking\Application;

use Distill\Application;
use Distill\Db\DbFactory;

abstract class AbstractApplication extends Application
{
    use Application\InitializerTrait;

    public function __construct($environment = 'dev')
    {
        $config = require_once __DIR__ . "/../../config/$environment.php";
        $config['environment'] = $environment;
        parent::__construct($config);
    }

    public function initializeServices()
    {
        $services = $this->serviceLocator;
        $services->db = function () {
            return (new DbFactory())->create($this->Configuration['db']);
        };
    }
}
