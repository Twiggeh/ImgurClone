#!/usr/bin/bash
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/parseParameters.sh"

# Set all environ variables, then run nodemon
echo NODE_ENV=development >.env
echo SERVER_DIR=$PWD >>.env

# DOMAINS
echo DOMAIN="${arguments[DOMAIN]}" >>.env
echo SUBDOMAIN="${arguments[SUBDOMAIN]}" >>.env
echo DOMAINEXTENSION="${arguments[DOMAINEXTENSION]}" >>.env

# PORTS
echo SECURE_PORT="${arguments[SECUREPORT]}" >>.env
echo DEV_PORT="${arguments[DEVELOPMENTPORT]}" >>.env
echo INSECURE_PORT="${arguments[INSECUREPORT]}" >>.env
# TODO : add config for production to not use maps

# PROTOCOL
echo BACKEND_PROTOCOL="${arguments[BACKENDPROTOCOL]}" >>.env

# DIRECTORIES
mkdir -p public/uploads
mkdir -p dist/public/uploads

tsc -w
