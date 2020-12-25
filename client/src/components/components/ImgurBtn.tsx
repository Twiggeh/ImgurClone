import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const ImgurBtn = ({ css }: { css?: string }) => {
	const history = useHistory();
	return (
		<Button
			css={css}
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
