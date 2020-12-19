const Login = () => {
	// Form Inputs
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	});

	const updateForm = (key: keyof typeof formState, value: string) => {
		setFormState(c => ({ ...c, [String(key)]: String(value) }));
	};

	// Password Visibility
	const [passVis, setPassVis] = useState<Record<string, boolean | undefined>>({});
	const toggleVisibility = (name: string) =>
		setPassVis(c => ({ ...c, [String(name)]: !c[String(name)] }));

	const isValid = validateInputs(formState);

	return (
		<CenteredFormPage>
			<BackHomeBtn />
			<Center>
				<SpaceItems>
					<SmallHeader>Login with</SmallHeader>
					<LayoutLogins>
						<Button content='google' href='todo'></Button>
						<Button content='github' href='todo'></Button>
					</LayoutLogins>

					<SmallHeader>or login with your email</SmallHeader>

					<StyledForm>
						<StyledLabel htmlFor='email'>
							E-Mail
							<StyledInput
								name='email'
								value={formState.email}
								onChange={e => updateForm('email', e.target.value)}
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
									Toggle
								</PassVisToggle>
							</PassWrap>
						</StyledLabel>
					</StyledForm>

					<AlignRight css={'* + * {margin-left: 0.2em;}'}>
						<SignUpButton content='need an account?' bgColor='transparent' />
						<Button
							content='Sign In'
							disabled={isValid}
							onClick={e => {
								e.preventDefault();
							}}
						/>
					</AlignRight>
				</SpaceItems>
			</Center>
		</CenteredFormPage>
	);
};

export default Login;

import React, { useState } from 'react';
import { validateInputs } from '../../utils/formHelpers';
import BackHomeBtn from '../components/BackHomeButton/BackHomeBtn';
import Button from '../components/Button/Button';
import {
	AlignRight,
	Center,
	LayoutLogins,
	CenteredFormPage,
	PassVisToggle,
	PassWrap,
	SmallHeader,
	SpaceItems,
	StyledForm,
	StyledInput,
	StyledLabel,
} from '../components/Form/AuthComponents';
import SignUpButton from '../components/SignUpButton/SignUpButton';
