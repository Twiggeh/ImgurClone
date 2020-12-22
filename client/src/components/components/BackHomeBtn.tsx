import React from 'react';
import { useHistory } from 'react-router-dom';
import { StyledBackToHome } from './AuthComponents';

const BackHomeBtn = () => {
	const history = useHistory();
	return (
		<StyledBackToHome onClick={() => history.push('/')}>back to Imgur</StyledBackToHome>
	);
};

export default BackHomeBtn;
