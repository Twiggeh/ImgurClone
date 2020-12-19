import React from 'react';
import { useHistory } from 'react-router-dom';
import { OptionalProps } from '../../../globals';
import Button, { ButtonProps } from '../Button/Button';

export type ISignIn = OptionalProps<
	ButtonProps,
	'fColor' | 'content' | 'href' | 'bgColor'
>;

const SignUpButton: React.FC<ISignIn> = props => {
	const history = useHistory();
	return Button({
		content: 'sign in',
		bgColor: 'transparent',
		onClick: e => {
			e.preventDefault();
			history.push('/login');
		},
		...props,
	});
};

export default SignUpButton;
