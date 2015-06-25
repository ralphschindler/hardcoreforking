<?php

namespace HardcoreForking\Resource;

interface ResourceInterface
{
    public function getStatus();
    public function getHeaders();
    public function getBody();
}
