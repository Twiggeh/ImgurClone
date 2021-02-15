import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess } from '../utils/scriptUtils.js';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

(async () => {
	const buildsBuffer = [];

	console.log('Building the production server and client');

	const [serverBuildLock, serverBuildProc] = asyncProcess('node build.js', {
		cwd: join(__dirname, 'server/scripts'),
		shell: true,
	});

	const [clientBuildLock, clientBuildProc] = asyncProcess('node build.js', {
		cwd: join(__dirname, 'client/scripts'),
		shell: true,
	});

	buildsBuffer.push(serverBuildLock, clientBuildLock);

	const results = await Promise.allSettled(buildsBuffer);

	serverBuildProc.kill();
	clientBuildProc.kill();

	results.forEach((build, i) => {
		if (build.status === 'fulfilled') {
			console.log(`Build ${i} succeeded ...`);
			return;
		}

		console.log(`Build ${i} failed ...`);
	});

	console.log('Starting the server ...');

	asyncProcess('node app', { cwd: join(__dirname, 'server/dist/src/app'), shell: true });
})();
