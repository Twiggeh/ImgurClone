import React from 'react';
import SignUpButton from '../components/SignUpButton/SignUpButton';

const TitleBar = () => {
	return (
		<div>
			<p>imgur</p>
			<input type='text' />

			<a>SignIn</a>
			<SignUpButton />
		</div>
	);
};

export default TitleBar;
