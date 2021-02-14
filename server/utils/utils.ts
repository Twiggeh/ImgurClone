export const deNull = <R extends null | undefined | unknown, T = undefined>(
	value: R,
	defaultValue: T | undefined = undefined
): T extends undefined
	? R extends null
		? undefined
		: Exclude<R, null>
	: R extends null | undefined
	? T
	: Exclude<R, null> => {
	// @ts-ignore
	return value ?? defaultValue;
};
