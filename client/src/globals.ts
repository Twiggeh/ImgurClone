export const PrimaryColor = 'blue';

export type Optional<Input> = {
	[P in keyof Input]?: Input[P];
};

export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>> extends infer O
	? { [P in keyof O]: O[P] }
	: never;

export type PartialExceptFor<T, K extends keyof T> = Pick<T, K> &
	Partial<Omit<T, K>> extends infer O
	? { [P in keyof O]: O[P] }
	: never;
