#!/usr/bin/bash

for i in "$@"
do 
case $i in
-d=* | --domain=*)
EXTENSION = "${i#*=}"
shift
;;
-s=* | --subdomain=*)
SUBDOMAIN = "${i#*=}"
shift
;;
-sp=* | --secureport=*)
SECUREPORT = "${i#*=}"
shift
;;
-dp=* | --secureport=*)
SECUREPORT = "${i#*=}"
shift
;;




# Set all environ variables, then run node (with tmux, otherwise use something like pm2 to deamonize)
echo NODE_ENV=production > .env
echo SERVER_DIR=$PWD >> .env

# DOMAINS
echo DOMAIN=91.89.120.211 >> .env
echo SUBDOMAIN= >> .env
echo DOMAINEXTENSION= >> .env

# PORTS
echo SECURE_PORT= 5000 >> .env
echo DEV_PORT= 5000 >> .env
echo INSECURE_PORT= 5000  >> .env
# TODO : add config for production to not use maps

# DIRECTORIES
mkdir -p public/uploads
mkdir -p dist/public/uploads

tsc
node ./dist/src/app.js