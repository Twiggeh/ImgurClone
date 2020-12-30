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

	const isValid = validateInputs(formState);

	return (
		<CenteredFormPage>
			<BackHomeBtn />
			<Center>
				<SpaceItems>
					<SmallHeader>Login with</SmallHeader>
					<LayoutLogins>
						<Button href='todo'>google</Button>
						<Button href='todo'>github</Button>
					</LayoutLogins>

					<SmallHeader>or register with your email</SmallHeader>

					<StyledForm>
						<StyledLabel htmlFor='username'>
							Username
							<StyledInput
								type='text'
								name='username'
								value={formState.userName}
								onChange={e => updateForm('userName', e.target.value)}
							/>
						</StyledLabel>

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
							disabled={isValid}
							onClick={e => {
								e.preventDefault();
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
	SmallHeader,
	SpaceItems,
	StyledForm,
	StyledInput,
	StyledLabel,
} from '../components/AuthComponents';
import SignInButton from '../components/SignIn';
import { OpenEyeSVG, ClosedEyeSVG } from '../../utils/assetImport';
