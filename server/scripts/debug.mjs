import { spawn } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import getParams from './parseParams.mjs';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

const {
	domain,
	subDomain,
	domainExt,
	insecurePort,
	devPort,
	securePort,
	backendProtocol,
} = getParams();

let envFileContent = '';
const addEnvContent = newContent => void (envFileContent += newContent + '\n');
// Set all environment variables, then run nodemon

addEnvContent('NODE_ENV=development');
addEnvContent(`SERVER_DIR=${join(__dirname, '..')}`);

// DOMAINS
addEnvContent(`DOMAIN="${domain}"`);
addEnvContent(`SUBDOMAIN="${subDomain}"`);
addEnvContent(`DOMAINEXTENSION="${domainExt}"`);

// PORTS
addEnvContent(`SECURE_PORT="${securePort}"`);
addEnvContent(`DEV_PORT="${devPort}"`);
addEnvContent(`INSECURE_PORT="${insecurePort}"`);
// TODO : add config for production to not use maps

// PROTOCOL
addEnvContent(`BACKEND_PROTOCOL="${backendProtocol}"`);

// DIRECTORIES
mkdirSync(join(__dirname, '..', 'public/uploads'), { recursive: true });
mkdirSync(join(__dirname, '..', 'dist/public/uploads'), { recursive: true });

// Write env file
writeFileSync(join(__dirname, '../.env'), envFileContent);

const tsc = spawn('tsc -w', { cwd: join(__dirname, '..'), shell: true });

tsc.stdout.on('data', data => console.log(data.toString()));
