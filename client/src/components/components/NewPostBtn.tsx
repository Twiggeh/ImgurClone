import { useTheme } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

const NewPostBtn = ({ scss }: CustomCss) => {
	const theme = useTheme();
	const history = useHistory();
	return (
		<Button
			scss={scss}
			bgColor={theme.color.accent}
			onClick={e => {
				e.preventDefault();
				history.push('/upload');
			}}>
			New Post
		</Button>
	);
};

export default NewPostBtn;
