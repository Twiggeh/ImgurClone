import React from 'react';
import { useHistory } from 'react-router-dom';
import { OptionalProps } from '../../globals';
import Button, { ButtonProps } from './Button';

export type ISignInBtn = OptionalProps<ButtonProps, 'fColor' | 'href' | 'bgColor'> &
	CustomCss;

const SignInBtn: React.FC<ISignInBtn> = props => {
	const history = useHistory();
	return (
		<Button
			bgColor='transparent'
			onClick={e => {
				e.preventDefault();
				history.push('/login');
			}}
			{...props}>
			sign in
		</Button>
	);
};

export default SignInBtn;
