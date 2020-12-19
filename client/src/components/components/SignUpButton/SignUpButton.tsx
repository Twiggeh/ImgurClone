import React from 'react';
import { useHistory } from 'react-router-dom';
import { OptionalProps } from '../../../globals';
import Button, { ButtonProps } from '../Button/Button';

export type ISignUp = OptionalProps<
	ButtonProps,
	'fColor' | 'content' | 'href' | 'bgColor'
>;

const SignUpButton: React.FC<ISignUp> = props => {
	const history = useHistory();

	return Button({
		content: 'Sign Up!',
		href: './register',
		onClick: e => {
			e.preventDefault();
			history.push('/register');
		},
		...props,
	});
};

export default SignUpButton;
