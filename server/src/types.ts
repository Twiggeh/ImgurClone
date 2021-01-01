export type MyContext = {
	user: null | { userName: string };
};

export type Optional<Input> = {
	[P in keyof Input]?: Input[P];
};

export type UnPromisify<T> = T extends Promise<infer U> ? U : T;
