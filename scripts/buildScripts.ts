import { dirname, join } from 'path';
import { URL } from 'url';
import { asyncProcess } from '../utils/scriptUtils.js';

const __dirname = decodeURI(dirname(new URL(import.meta.url).pathname));

(async () => {
	await asyncProcess('tsc', { cwd: __dirname })[0];
	await asyncProcess('tsc', { cwd: join(__dirname, '../client/scripts') })[0];
	await asyncProcess('tsc', { cwd: join(__dirname, '../server/scripts') })[0];
})();
