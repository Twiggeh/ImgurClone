import React from 'react';
import SearchBar from './components/SearchBar';
import SignUpButton from './components/SignUpButton';
import SignInButton from './components/SignIn';
import styled from '@emotion/styled';
import NewPostBtn from './components/NewPostBtn';
import ImgurBtn from './components/ImgurBtn';
import { Theme, useTheme } from '@emotion/react';

const smallScreen = (theme: Theme) => `${theme.mq.phone} {
		display: none;
	}`;

const TitleBar = ({
	logoVis = true,
	newPostVis = true,
	searchBar = true,
	signIn = true,
	signUp = true,
	css = '',
}) => {
	const theme = useTheme();
	return (
		<StyledBar css={css}>
			<StyledGroup>
				{logoVis ? <ImgurBtn /> : null}
				{newPostVis ? <NewPostBtn css={smallScreen(theme)} /> : null}
			</StyledGroup>
			{searchBar ? <SearchBar /> : null}
			<StyledGroup>
				{signIn ? <SignInButton css={smallScreen(theme)} /> : null}
				{signUp ? <SignUpButton /> : null}
			</StyledGroup>
		</StyledBar>
	);
};

var StyledGroup = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	& > * + * {
		margin-left: 1em;
	}
`;

var StyledBar = styled.div<{ css: string }>`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.4em 1em 0.4em 1em;
	${props => props.css};
`;

export default TitleBar;
