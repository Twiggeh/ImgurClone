#!/usr/bin/bash
# Set all environment variables and then run the code
echo NODE_ENV=production > .env
echo BACKEND_URL=localhost:5000 >> .env
webpack --config ./config/webpack.prod.js --mode production