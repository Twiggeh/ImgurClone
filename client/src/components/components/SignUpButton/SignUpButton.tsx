import React from 'react';
import { OptionalProps } from '../../../globals';
import Button, { ButtonProps } from '../Button/Button';

export type ISignUp = OptionalProps<
	ButtonProps,
	'fColor' | 'content' | 'href' | 'bgColor' | 'type'
>;

const SignUpButton: React.FC<ISignUp> = props =>
	Button({
		content: 'Sign Up!',
		href: 'TODO',
		type: 'button',
		...props,
	});

export default SignUpButton;
