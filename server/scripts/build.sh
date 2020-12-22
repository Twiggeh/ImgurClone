#!usr/bin/bash
# Set all environ variables, then run node (with tmux, otherwise use something like pm2 to deamonize)
echo NODE_ENV=production > .env
echo DOMAIN=dontforgettochangeme >> .env
echo SUBDOMAIN=www >> .env
echo DOMAINEXTENSION=com >> .env
echo SERVER_DIR=$PWD >> .env
# TODO : add config for production to not use maps

mkdir -p public/uploads
mkdir -p dist/public/uploads

tsc
node ./dist/app.js