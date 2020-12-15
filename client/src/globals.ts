export const PrimaryColor = 'blue';

export type Optional<Input> = {
	[P in keyof Input]?: Input[P];
};

export type OptionalProps<Input, Excl> = {
	[P in Exclude<keyof Input, Excl>]: Input[P];
} &
	Optional<Input>;
