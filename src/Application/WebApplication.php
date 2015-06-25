<?php

namespace HardcoreForking\Application;

use Distill\Module\DevModule;
use HardcoreForking\Endpoint;
use HardcoreForking\Resource\FrontEndAppResource;
use HardcoreForking\Resource\ResourceInterface;

class WebApplication extends AbstractApplication
{

    public function initializeServices()
    {
        if ($this->environment == 'dev') {
            $this->register(new DevModule());
        }
        $this->services->set('githubAuth', function () {
            $c = $this->Configuration['github_auth'];
            return new Service\GithubAuth($c['client_id'], $c['client_secret'], $c['redirect_uri']);
        }, Service\GithubAuth::class);
    }


    public function initializeRoutes()
    {
        $this['home'] = ['GET /', Endpoint\IndexEndpoint::class];
        $this['authorize'] = ['POST /authorize', Endpoint\AuthEndpoint::class];
    }

    public function initializeLifecycleHandlers()
    {
        $this->on('Application.PreRoute', function () {
            if (!isset($_SERVER['HTTP_ACCEPT']) || !strpos($_SERVER['HTTP_ACCEPT'], 'json')) {
                echo (new FrontEndAppResource())->getBody();
                die();
            }
        });

        $this->on('Application.PreDispatch', function () {

            if (isset($_SERVER['HTTP_ORIGIN'])) {
                header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
                header('Access-Control-Allow-Headers: origin, content-type, accept');
            }

            // default response content-type
            header('Content-Type: application/json');

            $body = file_get_contents('php://input');
            if ($body) {
                $_REQUEST['BODY'] = $body;
                if (isset($_SERVER['HTTP_CONTENT_TYPE']) && strpos($_SERVER['HTTP_CONTENT_TYPE'], 'json') !== false) {
                    $_REQUEST['BODY_PARAMS'] = json_decode($_REQUEST['BODY'], true);
                }
            }

        });

        $this->on('Application.PostDispatch', function ($return) {
            if ($return instanceof ResourceInterface) {
                foreach ($return->getHeaders() as $headerName => $headerValue) {
                    header("$headerName: $headerValue");
                }
                echo $return->getBody();
            } elseif (is_array($return)) {
                // already json
                echo json_encode($return, JSON_PRETTY_PRINT);
            } else {
                header('Content-Type: text/plain');
                echo $return;
            }
        });
    }
}
