<?php

namespace HardcoreForking\Endpoint;

use HardcoreForking\Resource\FrontEndAppResource;

class IndexEndpoint
{
    public function __invoke()
    {
        return new FrontEndAppResource();
    }
}
