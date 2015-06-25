<?php

namespace HardcoreForking\Application\Service;

use Psecio\Jwt;

class GithubAuth
{
    protected $clientId;
    protected $clientSecret;
    protected $redirectUri;
    protected $authorizedUsers;

    public function __construct($clientId, $clientSecret, $redirectUri)
    {
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
        $this->redirectUri = $redirectUri;
    }

    public function authorize($authorizationCode, &$failureMessage = null)
    {
        $body = "code=$authorizationCode&client_id={$this->clientId}&client_secret={$this->clientSecret}&redirect_uri={$this->redirectUri}&grant_type=authorization_code";

        $response = file_get_contents('https://github.com/login/oauth/access_token', null, stream_context_create([
            'http' => [
                'ignore_errors' => true,
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $body
            ]
        ]));


        parse_str($response, $responseParams);

        if (isset($responseParams['error'])) {
            $failureMessage = $responseParams['error_description'];
            return false;
        }

        $accessToken = $responseParams['access_token'];

        $tokenInfo = file_get_contents('https://api.github.com/user', null, stream_context_create([
            'http' => [
                'ignore_errors' => true,
                'header' => "User-Agent: hardcoreforking.org\r\nAuthorization: token $accessToken"
            ]
        ]));
        $tokenData = json_decode($tokenInfo, true);

        if (!isset($tokenData['login'])) {
            $failureMessage = 'login not found in user lookup';
            return false;
        }

        $jwt = new Jwt\Jwt(new Jwt\Header('hardcoreforking'));
        $jwt
            ->issuer('http://hardcoreforking.org')
            ->audience('http://hardcoreforking.org')
            ->issuedAt(time())
            ->notBefore(time())
            ->expireTime(time()+3600)
            ->jwtId($tokenData['login'])
            ->type($this->redirectUri);

        return $jwt->encode();
    }

    public function getTokenData($token)
    {
        $jwt = new Jwt\Jwt(new Jwt\Header('starfish'));
        return $jwt->decode($token);
    }
}

