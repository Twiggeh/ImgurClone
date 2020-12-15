echo NODE_ENV=production > .env
echo ANALYZE=true >> .env
echo BACKEND_URL=http://localhost:5050 >> .env
webpack --config ./config/webpack.prod.js --mode production