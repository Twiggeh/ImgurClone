import React from 'react';
import SearchBar from './components/SearchBar';
import SignUpButton from './components/SignUpButton';
import SignInButton from './components/SignIn';
import styled from '@emotion/styled';
import NewPostBtn from './components/NewPostBtn';
import ImgurBtn from './components/ImgurBtn';

const TitleBar = ({
	logoVis = true,
	newPostVis = true,
	searchBar = true,
	signIn = true,
	signUp = true,
}) => {
	return (
		<StyledBar>
			<StyledGroup>
				{logoVis ? <ImgurBtn /> : null}
				{newPostVis ? <NewPostBtn /> : null}
			</StyledGroup>
			{searchBar ? <SearchBar /> : null}
			<StyledGroup>
				{signIn ? <SignInButton /> : null}
				{signUp ? <SignUpButton /> : null}
			</StyledGroup>
		</StyledBar>
	);
};

var StyledGroup = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	* + * {
		margin-left: 1em;
	}
`;

var StyledBar = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.4em 1em 0.4em 1em;
`;

export default TitleBar;
