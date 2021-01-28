const isEmail = (email: string) => {
	// eslint-disable-next-line security/detect-unsafe-regex
	const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return res.test(String(email).toLowerCase());
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validateInputs: ValidateInputs = formState => {
	const whichSucceeded: ReturnType<ValidateInputs>['1'] = {};

	const allValid = Object.keys(formState).reduce<boolean>((acc, curKey) => {
		let condition: boolean;
		switch (curKey) {
			case 'email':
				condition = !isEmail(formState.email);
				whichSucceeded.email = !condition;
				break;
			default:
				condition = formState[String(curKey)] === '';
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				whichSucceeded[String(curKey)] = !condition;
				break;
		}
		return acc === true || condition;
	}, false);

	return [allValid, whichSucceeded];
};

type ValidateInputs = <In extends { email: string } & Record<string, unknown>>(
	obj: In
) => [allValid: boolean, whichSucceeded: { [P in keyof In]?: boolean }];

export { isEmail, validateInputs };
