const Login = () => {
	// Form Inputs
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		emailVisited: false,
	});

	const updateForm = (key: keyof typeof formState, value: string | boolean) => {
		setFormState(c => ({ ...c, [String(key)]: value }));
	};

	// Password Visibility
	const [passVis, setPassVis] = useState<Record<string, boolean | undefined>>({});
	const toggleVisibility = (name: string) =>
		setPassVis(c => ({ ...c, [String(name)]: !c[String(name)] }));

	const [allValid, { email: emailIsCorrect }] = validateInputs(formState);

	const showEmailError: boolean =
		!formState.emailVisited || emailIsCorrect ? false : true;

	return (
		<CenteredFormPage>
			<BackHomeBtn />
			<Center>
				<SpaceItems>
					<MiniTitle>Login with</MiniTitle>
					<LayoutLogins>
						<Button href={`${BACKEND_SERVER_URL}/oauth/google`}>google</Button>
						<Button disabled={true} href='todo'>
							github
						</Button>
					</LayoutLogins>

					<MiniTitle>or login with your email</MiniTitle>

					<StyledForm>
						<StyledLabel htmlFor='email'>
							E-Mail
							{showEmailError ? (
								<StyledLabelError>- Email formatted incorrectly</StyledLabelError>
							) : null}
							<StyledInput
								name='email'
								value={formState.email}
								onChange={e => updateForm('email', e.target.value)}
								onBlur={() => updateForm('emailVisited', true)}
							/>
						</StyledLabel>

						<StyledLabel htmlFor='password'>
							Password
							<PassWrap>
								<StyledInput
									type={passVis.pass ? 'text' : 'password'}
									name='password'
									value={formState.password}
									onChange={e => updateForm('password', e.target.value)}
								/>
								<PassVisToggle onClick={() => toggleVisibility('pass')}>
									{passVis.pass ? <OpenEyeSVG /> : <ClosedEyeSVG />}
								</PassVisToggle>
							</PassWrap>
						</StyledLabel>
					</StyledForm>

					<AlignRight css={'* + * {margin-left: 0.2em;}'}>
						<SignUpButton bgColor='transparent'>need an account?</SignUpButton>
						<Button
							disabled={allValid}
							onClick={e => {
								e.preventDefault();
							}}>
							Sign In
						</Button>
					</AlignRight>
				</SpaceItems>
			</Center>
		</CenteredFormPage>
	);
};

export default Login;

import React, { useState } from 'react';
import { validateInputs } from '../utils/formHelpers';
import BackHomeBtn from './components/BackHomeBtn';
import Button from './components/Button';
import {
	AlignRight,
	Center,
	LayoutLogins,
	CenteredFormPage,
	PassVisToggle,
	PassWrap,
	MiniTitle,
	SpaceItems,
	StyledForm,
	StyledInput,
	StyledLabel,
	StyledLabelError,
} from './components/AuthComponents';
import SignUpButton from './components/SignUpButton';
import { ClosedEyeSVG, OpenEyeSVG } from '../utils/assetImport';
