const Register = () => {
	const history = useHistory();

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

	const [addUser, { data, loading, error }] = useAddUserMutation({
		onCompleted: mutation => {
			mutation.addUser.__typename === 'AddUserSuccess' && history.push('/profile');
		},
	});

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
				{JSON.stringify(error) /* TODO: FIX ERROR HANDLING*/}
				{JSON.stringify(data?.addUser.message) /* TODO: FIX ERROR HANDLING*/}
				<SpaceItems>
					<MiniTitle>Login with</MiniTitle>
					<LayoutLogins>
						<Button href={`${BACKEND_SERVER_URL}/oauth/google`}>Google</Button>
						<Button disabled={true} href='todo'>
							Github
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
							<PasswordError
								password={password}
								confirmPassword={confirmPassword}
								confirmPasswordVisited={formState.confirmPasswordVisited}
							/>
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
							<PasswordError
								password={password}
								confirmPassword={confirmPassword}
								confirmPasswordVisited={formState.confirmPasswordVisited}
							/>
							<PassWrap>
								<StyledInput
									type={passVis.confirm ? 'text' : 'password'}
									name='confirmPassword'
									value={formState.confirmPassword}
									onChange={e => setForm('confirmPassword', e.target.value)}
									onBlur={() => setForm('confirmPasswordVisited', true)}
								/>
								<PassVisToggle as='i' onClick={() => toggleVisibility('confirm')}>
									{passVis.confirm ? <OpenEyeSVG /> : <ClosedEyeSVG />}
								</PassVisToggle>
							</PassWrap>
						</StyledLabel>
					</StyledForm>

					<AlignRight scss={'* + * {margin-left: 0.2em;}'}>
						<SignInBtn />
						<Button
							disabled={allValid}
							onClick={e => {
								e.preventDefault();
								addUser({ variables: addUserVars });
							}}>
							{loading ? `Trying to create user: ${formState.userName}.` : 'Submit'}
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
	PasswordError,
} from '../components/AuthComponents';
import SignInBtn from '../components/SignInBtn';
import { OpenEyeSVG, ClosedEyeSVG } from '../../utils/assetImport';
import { AddUserMutationVariables, useAddUserMutation } from '../../generated/graphql';
import { useHistory } from 'react-router';
