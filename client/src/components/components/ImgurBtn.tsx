import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const ImgurBtn = () => {
	const history = useHistory();
	return (
		<Button
			bgColor='transparent'
			onClick={e => {
				e.preventDefault();
				history.push('/');
			}}>
			imgur
		</Button>
	);
};

export default ImgurBtn;
