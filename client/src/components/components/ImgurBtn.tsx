import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const ImgurBtn = ({ scss }: CustomCss) => {
	const history = useHistory();
	return (
		<Button
			scss={scss}
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
