import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess } from '../../utils/scriptUtils.js';
import { processParams } from './parseParams.js';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

const defaultDebugCfg = {
	backendUrl: 'http://localhost:5050',
};

const { backendUrl } = processParams(process.argv, defaultDebugCfg);

let envFileContent = '';
const addEnvContent = (newContent: string) => void (envFileContent += newContent + '\n');
// Set all environment variables, then run nodemon

addEnvContent('NODE_ENV=production');

// URL
addEnvContent(`BACKEND_URL="${backendUrl}"`);

// Write env file
writeFileSync(join(__dirname, '../.env'), envFileContent);

(async () => {
	console.log('Compiling the server ...');
	await asyncProcess('webpack --config ./config/webpack.prod.js --mode production', {
		shell: true,
		cwd: join(__dirname, '..'),
	})[0];
	console.log('Server has been compiled.');
})();
