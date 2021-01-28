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
		let didFail: boolean;

		switch (curKey) {
			case 'email':
				didFail = !isEmail(formState.email);
				whichSucceeded.email = !didFail;
				break;
			case 'confirmPassword':
			case 'password':
				didFail = formState.password !== formState.confirmPassword;
				whichSucceeded.password = !didFail;
				whichSucceeded.confirmPassword = !didFail;
				break;
			default:
				didFail = formState[String(curKey)] === '';
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				whichSucceeded[String(curKey)] = !didFail;
				break;
		}
		return acc === true || didFail;
	}, false);

	return [allValid, whichSucceeded];
};

type ValidateInputs = <In extends { email: string } & Record<string, unknown>>(
	obj: In
) => [allValid: boolean, whichSucceeded: { [P in keyof In]?: boolean }];

export { isEmail, validateInputs };
