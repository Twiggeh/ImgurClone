import react, { createContext, useContext } from 'react';

const createCtx = <A extends Record<string, unknown> | undefined>(): readonly [
	() => A,
	react.Provider<A | undefined>
] => {
	const context = createContext<A | undefined>(undefined);

	const useCtx = () => {
		const c = useContext(context);
		if (c === undefined)
			throw new Error('Need to use this inside the appropriate Provider');
		return c;
	};

	return [useCtx, context.Provider] as const;
};

export default createCtx;
