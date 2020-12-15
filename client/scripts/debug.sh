#!/usr/bin/bash
# Set all environtment variables, then start the webpack-dev-server
echo NODE_ENV=development > .env
echo BACKEND_URL=http://localhost:5050 >> .env
webpack-dev-server --config ./config/webpack.dev.js --mode development --host 0.0.0.0 --port 5000