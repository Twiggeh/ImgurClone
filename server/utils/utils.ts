export const deNull = <R extends null | unknown, T>(
	value: R,
	defaultValue: T | undefined = undefined
) => {
	value ?? defaultValue;
	return value as Extract<T, null> | T;
};
