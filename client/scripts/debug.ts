import { writeFileSync } from 'fs';
import { join } from 'path';
import { asyncProcess } from '../../utils/scriptUtils.js';
import { processParams } from './parseParams.js';

const defaultDebugCfg = {
	backendUrl: 'http://localhost:5050',
	devPort: '5000',
};

const { backendUrl, devPort } = processParams(process.argv, defaultDebugCfg);

let envFileContent = '';
const addEnvContent = (newContent: string) => void (envFileContent += newContent + '\n');
// Set all environment variables, then run nodemon

addEnvContent('NODE_ENV=development');

// URL
addEnvContent(`BACKEND_URL="${backendUrl}"`);

// Write env file
writeFileSync(join(__dirname, '../.env'), envFileContent);

(async () => {
	console.log('Compiling the server ...');
	await asyncProcess(
		`webpack-dev-server --config ./config/webpack.dev.js --mode development --host 0.0.0.0 --port ${devPort}`,
		{
			shell: true,
			cwd: join(__dirname, '..'),
		}
	)[0];
	console.log('Server has been compiled.');
})();