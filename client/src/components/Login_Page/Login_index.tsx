import React from 'react';
import Button from '../components/Button/Button';

const Login = () => {
	return (
		<div>
			<div>
				<Button content='google' href='todo'></Button>
			</div>
			<form>
				<label htmlFor='username'>
					<input type='text' name='username' />
				</label>
				<label htmlFor='email'>
					<input type='email' name='email' />
				</label>
				<label htmlFor='password'>
					<input type='text' name='password' />
				</label>
				<label htmlFor='confirmPassword'>
					<input type='text' name='confirmPassword' />
				</label>
			</form>
		</div>
	);
};

export default Login;
