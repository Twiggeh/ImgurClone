import React from 'react';
import { OptionalProps, PrimaryColor } from '../../../globals';
import Button, { ButtonProps } from '../Button/Button';

export type ISignUp = OptionalProps<ButtonProps, 'color' | 'content' | 'href' | 'type'>;

const SignUpButton: React.FC<ISignUp> = props =>
	Button({
		...props,
		color: PrimaryColor,
		content: 'Sign Up!',
		href: 'TODO',
		type: 'button',
	});

export default SignUpButton;
