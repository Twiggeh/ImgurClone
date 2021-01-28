const Register = () => {
	// Form Inputs
	const [formState, setFormState] = useState({
		email: '',
		emailVisited: false,
		password: '',
		confirmPassword: '',
		confirmPasswordVisited: false,
		userName: '',
	});

	const setForm = (key: keyof typeof formState, value: string | boolean) => {
		setFormState(c => ({ ...c, [String(key)]: value }));
	};

	// Password Visibility
	const [passVis, setPassVis] = useState<Record<string, boolean | undefined>>({});
	const toggleVisibility = (name: string) =>
		setPassVis(c => ({ ...c, [String(name)]: !c[String(name)] }));

	const [allValid, { email: emailValid, confirmPassword, password }] = validateInputs(
		formState
	);

	const [addUser] = useAddUserMutation();

	const addUserVars: AddUserMutationVariables = {
		addUserInput: {
			userName: formState.userName,
			local: {
				email: formState.email,
				password: formState.password,
				verifyPassword: formState.confirmPassword,
			},
		},
	};

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

					<MiniTitle>or register with your email</MiniTitle>

					<StyledForm>
						<StyledLabel htmlFor='username'>
							Username
							<StyledInput
								type='text'
								name='username'
								value={formState.userName}
								onChange={e => setForm('userName', e.target.value)}
							/>
						</StyledLabel>

						<StyledLabel htmlFor='email'>
							E-Mail
							<EmailError {...{ emailValid, emailVisited: formState.emailVisited }} />
							<StyledInput
								name='email'
								value={formState.email}
								onChange={e => setForm('email', e.target.value)}
								onBlur={() => setForm('emailVisited', true)}
							/>
						</StyledLabel>

						<StyledLabel htmlFor='password'>
							Password
							<PassWrap>
								<StyledInput
									type={passVis.pass ? 'text' : 'password'}
									name='password'
									value={formState.password}
									onChange={e => setForm('password', e.target.value)}
								/>
								<PassVisToggle as='i' onClick={() => toggleVisibility('pass')}>
									{passVis.pass ? <OpenEyeSVG /> : <ClosedEyeSVG />}
								</PassVisToggle>
							</PassWrap>
						</StyledLabel>

						<StyledLabel htmlFor='confirmPassword'>
							Repeat Password
							<PassWrap>
								<StyledInput
									type={passVis.confirm ? 'text' : 'password'}
									name='confirmPassword'
									value={formState.confirmPassword}
									onChange={e => setForm('confirmPassword', e.target.value)}
								/>
								<PassVisToggle as='i' onClick={() => toggleVisibility('confirm')}>
									{passVis.confirm ? <OpenEyeSVG /> : <ClosedEyeSVG />}
								</PassVisToggle>
							</PassWrap>
						</StyledLabel>
					</StyledForm>

					<AlignRight css={'* + * {margin-left: 0.2em;}'}>
						<SignInButton />
						<Button
							disabled={allValid}
							onClick={e => {
								e.preventDefault();
								addUser({ variables: addUserVars });
							}}>
							Submit
						</Button>
					</AlignRight>
				</SpaceItems>
			</Center>
		</CenteredFormPage>
	);
};

export default Register;

import React, { useState } from 'react';
import { validateInputs } from '../../utils/formHelpers';
import BackHomeBtn from '../components/BackHomeBtn';
import Button from '../components/Button';
import {
	EmailError,
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
} from '../components/AuthComponents';
import SignInButton from '../components/SignIn';
import { OpenEyeSVG, ClosedEyeSVG } from '../../utils/assetImport';
import { AddUserMutationVariables, useAddUserMutation } from '../../generated/graphql';
