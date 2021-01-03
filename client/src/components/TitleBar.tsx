import React from 'react';
import SearchBar from './components/SearchBar';
import SignUpButton from './components/SignUpButton';
import SignInButton from './components/SignIn';
import styled from '@emotion/styled';
import NewPostBtn from './components/NewPostBtn';
import ImgurBtn from './components/ImgurBtn';
import { Theme, useTheme } from '@emotion/react';
import { IdentityContext } from './Body_index';
import ProfileBtn from './components/ProfileBtn';

interface ITitleBar {
	logoVis?: boolean;
	newPostVis?: boolean;
	searchBar?: boolean;
	signIn?: boolean;
	signUp?: boolean;
	profCol?: string;
	newPostCol?: string;
	loginCol?: string;
	signCol?: string;
	imgurCol?: string;
	css?: string;
}

const smallScreen = (theme: Theme) => `${theme.mq.phone} {
		display: none;
	}`;

const TitleBar: React.FC<ITitleBar> = ({
	logoVis = true,
	newPostVis = true,
	searchBar = true,
	signIn = true,
	signUp = true,
	profCol = '',
	loginCol = '',
	newPostCol = '',
	signCol = '',
	imgurCol = 'transparent',
	css = '',
}) => {
	const theme = useTheme();
	const { identity } = IdentityContext();

	const ImgurColor = `background-color: ${imgurCol}`;
	const NewPostColor = `background-color: ${newPostCol || theme.color.accent}`;
	const ProfileColor = `background-color: ${profCol || theme.color.primary}`;
	const SignInColor = `background-color: ${signCol || 'transparent'}`;
	const SignUpColor = `background-color: ${loginCol || theme.color.primary}`;

	return (
		<StyledBar css={css}>
			<StyledGroup>
				{logoVis ? <ImgurBtn css={ImgurColor} /> : null}
				{newPostVis ? <NewPostBtn css={smallScreen(theme) + NewPostColor} /> : null}
			</StyledGroup>
			{searchBar ? <SearchBar /> : null}
			{identity ? (
				<ProfileBtn name={identity.userName} css={ProfileColor} />
			) : (
				<StyledGroup>
					{signIn ? <SignInButton css={smallScreen(theme) + SignInColor} /> : null}
					{signUp ? <SignUpButton css={SignUpColor} /> : null}
				</StyledGroup>
			)}
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
