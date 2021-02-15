import React from 'react';
import { useHistory } from 'react-router-dom';
import { OptionalProps } from '../../globals';
import Button, { ButtonProps } from './Button';

export type ISignUpBtn = OptionalProps<ButtonProps, 'fColor' | 'href' | 'bgColor'> &
	CustomCss;

const SignUpBtn: React.FC<ISignUpBtn> = props => {
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

export default SignUpBtn;
