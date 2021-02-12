export type Optional<Input> = {
	[P in keyof Input]?: Input[P];
};

export type Await<T> = T extends Promise<infer U> ? U : T;
