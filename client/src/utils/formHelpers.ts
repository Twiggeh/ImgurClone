const isEmail = (email: string) => {
	// eslint-disable-next-line security/detect-unsafe-regex
	const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return res.test(String(email).toLowerCase());
};

const validateInputs: <In extends { email: string } & Record<string, unknown>>(
	obj: In
) => boolean = formState => {
	return Object.keys(formState).reduce<boolean>((acc, curKey) => {
		const condition =
			curKey === 'email' ? !isEmail(formState.email) : formState[String(curKey)] === '';

		return acc === true || condition;
	}, false);
};

export { isEmail, validateInputs };
