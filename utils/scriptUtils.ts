import { spawn, SpawnOptionsWithoutStdio } from 'child_process';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

type OptionalFNParam<T, R> = T extends undefined ? (argO?: never) => R : (arg0: T) => R;

interface Lock<Resolve, Reject> {
	p: Promise<Resolve | Reject>;
	res: OptionalFNParam<Resolve, void>;
	rej: OptionalFNParam<Reject, void>;
}

export const createLock = <Resolve = undefined, Reject = undefined>(): Lock<
	Resolve,
	Reject
> => {
	const lock: Partial<Lock<Resolve, Reject>> = {};
	lock.p = new Promise<Resolve | Reject>((res, rej) => {
		lock.res = res as OptionalFNParam<Resolve, void>;
		lock.rej = rej as OptionalFNParam<Reject, void>;
	});
	return lock as Lock<Resolve, Reject>;
};

export const asyncReadLine = async (question: string): Promise<string> => {
	const questionLock = createLock<string, string>();
	rl.question(question, questionLock.res);
	return questionLock.p;
};

/**
 * Wait for a process to exit or for a process to reach a flag
 */
export const asyncProcess = (
	command: string,
	opts: SpawnOptionsWithoutStdio,
	outputNeedsToEqual?: string
) => {
	const procLock = createLock<undefined, string>();
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

	subProc.stderr.on('data', (e: string) => {
		const nonErrors = [
			'Debugger attached.\n',
			'Waiting for the debugger to disconnect...\n',
			'DeprecationWarning:',
			'Cloning',
			'warning',
		];

		const strErr = e.toString();
		console.error(strErr);
		for (const nonError of nonErrors) {
			if (strErr.includes(nonError)) return;
		}
		procLock.rej(strErr);
	});

	return [procLock.p, subProc] as const;
};
