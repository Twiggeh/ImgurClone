const Register = () => {
	// Form Inputs
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		userName: '',
	});

	const updateForm = (key: keyof typeof formState, value: string) => {
		setFormState(c => ({ ...c, [String(key)]: String(value) }));
	};

	// Password Visibility
	const [passVis, setPassVis] = useState<Record<string, boolean | undefined>>({});
	const toggleVisibility = (name: string) =>
		setPassVis(c => ({ ...c, [String(name)]: !c[String(name)] }));

	const [allValid] = validateInputs(formState);

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
								disabled={true}
								placeholder='Currently not available'
								type='text'
								name='username'
								value={formState.userName}
								onChange={e => updateForm('userName', e.target.value)}
							/>
						</StyledLabel>

						<StyledLabel htmlFor='email'>
							E-Mail
							<StyledInput
								disabled={true}
								placeholder='Currently not available'
								name='email'
								value={formState.email}
								onChange={e => updateForm('email', e.target.value)}
							/>
						</StyledLabel>

						<StyledLabel htmlFor='password'>
							Password
							<PassWrap>
								<StyledInput
									disabled={true}
									placeholder='Currently not available'
									type={passVis.pass ? 'text' : 'password'}
									name='password'
									value={formState.password}
									onChange={e => updateForm('password', e.target.value)}
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
									disabled={true}
									placeholder='Currently not available'
									type={passVis.confirm ? 'text' : 'password'}
									name='confirmPassword'
									value={formState.confirmPassword}
									onChange={e => updateForm('confirmPassword', e.target.value)}
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
