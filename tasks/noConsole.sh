#!/bin/bash

##############################################################
###  Fail if source files contain `console.*` statements.  ###
##############################################################

! /usr/bin/grep \
  --color=always \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=coverage \
  --exclude-dir=dist \
  --exclude-dir=build \
  --exclude-dir=tasks \
  --exclude=./utils/hermes.ts \
  --exclude=./src/server/config/index.js \
  --exclude=./clarity.sublime-workspace \
  -R 'console.log\|console.warn\|console.info' .
