import { spawn } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { createInterface } from 'readline';

// TODO : catch every single async process, and handle appropriately

const rl = createInterface({ input: process.stdin, output: process.stdout });

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

/**
 * @returns {{res: ()=>void, rej: ()=>void, p: Promise<void> }}
 */
const createLock = () => {
	const lock = {};
	lock.p = new Promise((res, rej) => {
		lock.res = res;
		res.rej = rej;
	});
	return lock;
};

/**
 * @param {string} question
 * @returns {Promise<string>}
 */
const asyncReadLine = async question => {
	const questionLock = createLock();
	rl.question(question, questionLock.res);
	return questionLock;
};

/**
 * Wait for a process to exit or for a process to reach a flag
 *
 * @param {string} command
 * @param {import('child_process').SpawnOptionsWithoutStdio} opts
 * @param {string} [outputNeedsToEqual]
 *
 * @returns {[Promise<void>, import('child_process').ChildProcessWithoutNullStreams]}
 */
const asyncProcess = (command, opts, outputNeedsToEqual) => {
	const procLock = createLock();
	const subProc = spawn(command, opts);

	if (outputNeedsToEqual) {
		subProc.stdout.on('data', data => {
			const strData = data.toString();
			console.log(strData);
			if (strData.includes(outputNeedsToEqual)) procLock.res();
		});
	} else {
		subProc.on('exit', procLock.res);
		subProc.stdout.on('data', data => console.log(data.toString()));
	}

	subProc.stderr.on('data', e => {
		const nonErrors = [
			'Debugger attached.\n',
			'Waiting for the debugger to disconnect...\n',
		];
		/**
		 *  @type { string }
		 */
		const strErr = e.toString();
		console.error(strErr);
		if (strErr.includes('DeprecationWarning:')) return;
		if (nonErrors.includes(strErr)) return;
		throw strErr;
	});

	return [procLock.p, subProc];
};

try {
	(async () => {
		console.log('Installing imgur client dependencies');
		await asyncProcess('yarn install', {
			cwd: join(__dirname, 'client'),
			shell: true,
		})[0];

		console.log('installing imgur server dependencies');
		await asyncProcess('yarn install', {
			cwd: join(__dirname, 'server'),
			shell: true,
		})[0];

		// Creating User required files
		console.log('setting up Imgur Clone server');

		if (!existsSync(join(__dirname, 'server/keys/keys.ts'))) {
			// Create the key directory
			mkdirSync(join(__dirname, 'server/keys'), { recursive: true });
			writeFileSync(join(__dirname, 'server/keys/keys.ts'));

			// Read User Input
			console.log(
				'You can create a free Account here : (https://account.mongodb.com/account/login)'
			);
			const mongooseKey = await asyncReadLine(
				'Please provide the connection URI for the Imgur Clone MongoDB database (mongodb+srv://<Username>:<Password>@...) :'
			);
			console.clear();

			console.log(
				'You can create an Google Application here : (https://console.developers.google.com/apis/credentials)'
			);

			const googleSecret = await asyncReadLine(
				'Please provide the Google Secret for Imgur Clone :'
			);
			const googleKey = await asyncReadLine(
				'Please provide the Google Key for Imgur Clone :'
			);
			console.clear();

			console.log(
				'You can create a random key on this website, set the length to ~80 : (https://passwordsgenerator.net/)'
			);
			const sessionSecret = await asyncReadLine(
				'Please Provide a key to encrypt the Imgur Clone Sessions with (any random string) :'
			);
			console.clear();

			console.log('Writing keys ...');

			const keyFileContent = `export const mongooseKey = '${mongooseKey}'

export const googleSecret = '${googleSecret}';
export const googleKey = '${googleKey}';

export const sessionSecret = '${sessionSecret}';`;

			writeFileSync(join(__dirname, 'server/keys/keys.ts'), keyFileContent);
			console.log('Written key file.');
		}

		console.log('Configuration of Imgur Clone completed');

		console.log('\n================================\n');

		console.log('Generating types for graphql ...');

		console.log('Building the development server ...');

		await asyncProcess(
			'yarn debug',
			{ shell: true, cwd: join(__dirname, 'server') },
			'Watching for file changes'
		)[0];

		console.log('Server has been built, starting the server.');

		const [debugServerLock, debugServerProc] = asyncProcess(
			`node ${join(__dirname, 'server/dist/src/app.js')}`,
			{ shell: true, cwd: join(__dirname, 'server') },
			'Dev server is listening on port'
		);

		await debugServerLock;

		console.log('Server has started successfully, generating the gql types now.');

		await asyncProcess('yarn gql:codegen', {
			shell: true,
			cwd: join(__dirname, 'server'),
		})[0];

		console.log('GQL Types for the server have been generated.');

		console.log('Server is running, building gql types for client.');

		await asyncProcess('yarn gql:codegen', {
			shell: true,
			cwd: join(__dirname, 'client'),
		})[0];

		console.log('GQL Types for the client have been generated.');
		console.log('Closing server now since all types have been built');

		debugServerProc.kill();

		console.log('Setup completed successfully');
		process.exit(0);
	})();
} catch (e) {
	console.log(e);
}
