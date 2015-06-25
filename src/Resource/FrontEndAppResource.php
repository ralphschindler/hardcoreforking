<?php

namespace HardcoreForking\Resource;

class FrontEndAppResource implements ResourceInterface
{
    public function getStatus()
    {
        return 200;
    }

    public function getHeaders()
    {
        return ['Content-type' => 'text/html'];
    }

    public function getBody()
    {
        return '<html>'
            . '<head><link rel="stylesheet" type="text/css" href="/css/build.css"><title>Hardcore Forking</title></head>'
            . '<body><section id="app"></section></body>'
            . '<script src="/js/build.js"></script>'
            . '</html>';
    }
}
