<?php

namespace HardcoreForking\Endpoint;

use HardcoreForking\Application\Service\GithubAuth;
use HardcoreForking\Resource\FrontEndAppResource;

class AuthEndpoint
{
    protected $githubAuth;

    public function __construct(GithubAuth $githubAuth)
    {
        $this->githubAuth = $githubAuth;
    }

    public function __invoke()
    {
        if (!isset($_REQUEST['BODY_PARAMS'])) {
            http_response_code(422);
            return ['message' => 'no body params'];
        }

        $token = $this->githubAuth->authorize($_REQUEST['BODY_PARAMS']['authorization_code'], $errorMessage);
        if (!$token) {
            http_response_code(401);
            return ['message' => $errorMessage];
        }
        file_put_contents('php://stderr', var_export($token, true));
        return ['token' => $token];
    }


}
