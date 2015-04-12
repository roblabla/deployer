#!/bin/sh
cd $(dirname $(which $0) )
node deployer.js $@ >> deployer_output 2>> deployer_error
