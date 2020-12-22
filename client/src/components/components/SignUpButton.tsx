import React from 'react';
import { useHistory } from 'react-router-dom';
import { OptionalProps } from '../../globals';
import Button, { ButtonProps } from './Button';

export type ISignUp = OptionalProps<ButtonProps, 'fColor' | 'href' | 'bgColor'>;

const SignUpButton: React.FC<ISignUp> = props => {
	const history = useHistory();

	return (
		<Button
			href='./register'
			onClick={e => {
				e.preventDefault();
				history.push('/register');
			}}
			{...props}>
			{props.children ? props.children : 'Sign Up!'}
		</Button>
	);
};

export default SignUpButton;
