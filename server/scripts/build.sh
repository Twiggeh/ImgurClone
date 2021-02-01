#!/usr/bin/bash
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/parseParameters.sh"

# Set all .env parameters
echo NODE_ENV=production >"$DIR/../.env"
echo SERVER_DIR=$PWD >>"$DIR/../.env"

# DOMAINS
echo DOMAIN="${arguments[DOMAIN]}" >>"$DIR/../.env"
echo SUBDOMAIN="${arguments[SUBDOMAIN]}" >>"$DIR/../.env"
echo DOMAINEXTENSION="${arguments[DOMAINEXTENSION]}" >>"$DIR/../.env"

# PORTS
echo SECURE_PORT="${arguments[SECUREPORT]}" >>"$DIR/../.env"
echo DEV_PORT="${arguments[DEVELOPMENTPORT]}" >>"$DIR/../.env"
echo INSECURE_PORT="${arguments[INSECUREPORT]}" >>"$DIR/../.env"
# TODO : add config for production to not use maps

# PROTOCOL
echo BACKEND_PROTOCOL="${arguments[BACKENDPROTOCOL]}" >>"$DIR/../.env"

# DIRECTORIES
mkdir -p public/uploads
mkdir -p dist/public/uploads

tsc
node ./dist/src/app.js
