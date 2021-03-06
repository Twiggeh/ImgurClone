import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess, useReadLine } from '../utils/scriptUtils.js';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

const asyncReadLine = useReadLine(process.stdin, process.stdout);

(async () => {
	try {
		console.log('Installing imgur client dependencies');
		await asyncProcess('yarn install', {
			cwd: join(__dirname, '../client'),
			shell: true,
		})[0];
	} catch (e) {
		console.log('Failed to install client dependencies');
		console.error(e);
	}
	try {
		console.log('installing imgur server dependencies');
		await asyncProcess('yarn install', {
			cwd: join(__dirname, '../server'),
			shell: true,
		})[0];
	} catch (e) {
		console.log('Failed to install client dependencies');
		console.error(e);
	}
	// Creating User required files
	console.log('Starting Imgur Clone Setup ...');

	if (!existsSync(join(__dirname, '../server/keys/keys.ts'))) {
		// Create the key directory
		mkdirSync(join(__dirname, '../server/keys'), { recursive: true });

		const variables = {
			mongooseKey: '',
			googleSecret: '',
			googleKey: '',
			sessionSecret: '',
		};

		try {
			// Read User Input
			console.log(
				'You can create a free Account here : (https://account.mongodb.com/account/login)'
			);
			variables.mongooseKey = await asyncReadLine(
				'Please provide the connection URI for the Imgur Clone MongoDB database (mongodb+srv://<Username>:<Password>@...) :'
			);
			console.clear();
		} catch (e) {
			console.log('Failed to read mongooseKey');
			console.error(e);
		}
		try {
			console.log(
				'You can create an Google Application here : (https://console.developers.google.com/apis/credentials)'
			);
			variables.googleSecret = await asyncReadLine(
				'Please provide the Google Secret for Imgur Clone :'
			);
			variables.googleKey = await asyncReadLine(
				'Please provide the Google Key for Imgur Clone :'
			);
			console.clear();
		} catch (e) {
			console.log('Failed to read googleSecret or googleKey');
			console.error(e);
		}
		try {
			console.log(
				'You can create a random key on this website, set the length to ~80 : (https://passwordsgenerator.net/)'
			);
			variables.sessionSecret = await asyncReadLine(
				'Please Provide a key to encrypt the Imgur Clone Sessions with (any random string) :'
			);
			console.clear();
		} catch (e) {
			console.log('Failed to read sessionSecret');
			console.error(e);
		}
		console.log('Writing keys ...');

		const keyFileContent = `export const mongooseKey = '${variables.mongooseKey}'

export const googleSecret = '${variables.googleSecret}';
export const googleKey = '${variables.googleKey}';

export const sessionSecret = '${variables.sessionSecret}';`;

		writeFileSync(join(__dirname, '../server/keys/keys.ts'), keyFileContent);
		console.log('Written key file.');
	}

	console.log('Configuration of Imgur Clone completed');

	console.log('\n================================\n');

	console.log('Generating types for graphql ...');

	console.log('Building the development server ...');
	try {
		await asyncProcess('yarn debug', {
			shell: true,
			cwd: join(__dirname, '../server'),
			outputNeedsToEqual: 'Watching for file changes',
		})[0];
		console.log('Server has been built, starting the server.');
	} catch (e) {
		console.log("Couldn't build the server ...");
		console.error(e);
	}

	let debugServerProc;
	try {
		const [debugServerLock, _debugServerProc] = asyncProcess(
			`node ${join(__dirname, '../server/dist/src/app.js')}`,
			{
				shell: true,
				cwd: join(__dirname, '../server'),
				outputNeedsToEqual: 'Dev server is listening on port',
			}
		);
		debugServerProc = _debugServerProc;

		await debugServerLock;

		console.log('Server has started successfully, generating the gql types now.');
	} catch (e) {
		console.log("Couldn't start the server");
		console.error(e);
	}
	try {
		await asyncProcess('yarn gql:codegen', {
			shell: true,
			cwd: join(__dirname, '../server'),
		})[0];

		console.log('GQL Types for the server have been generated.');
	} catch (e) {
		console.log("Couldn't generate servers' gql types");
		console.error(e);
	}

	try {
		await asyncProcess('yarn gql:codegen', {
			shell: true,
			cwd: join(__dirname, '../client'),
		})[0];

		console.log('GQL Types for the client have been generated.');
	} catch (e) {
		console.log("Couldn't generate servers' gql types");
		console.error(e);
	}
	console.log('Attempting to close the server now since all types have been built ...');

	debugServerProc && debugServerProc.kill();

	console.log('Setup completed');
})();
