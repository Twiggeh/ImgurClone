import React from 'react';
import SearchBar from './components/SearchBar';
import SignUpBtn from './components/SignUpBtn';
import SignInBtn from './components/SignInBtn';
import styled from '@emotion/styled';
import NewPostBtn from './components/NewPostBtn';
import ImgurBtn from './components/ImgurBtn';
import { Theme, useTheme } from '@emotion/react';
import { IdentityContext } from './Body_index';
import ProfileBtn from './components/ProfileBtn';
import LogOutBtn from './components/LogOutBtn';

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
	scss?: string;
}

const smallScreen = (theme: Theme) => `${theme.mq.phone} {
		display: none;
	}`;
const mediumScreen = (theme: Theme) => `${theme.mq.tablet} {
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
	scss = '',
}) => {
	const theme = useTheme();
	const { identity } = IdentityContext();

	const ImgurColor = `background-color: ${imgurCol}`;
	const NewPostColor = `background-color: ${newPostCol || theme.color.accent}`;
	const ProfileColor = `background-color: ${profCol || theme.color.primary}`;
	const SignInColor = `background-color: ${signCol || 'transparent'}`;
	const SignUpColor = `background-color: ${loginCol || theme.color.primary}`;

	return (
		<StyledBar scss={scss}>
			<StyledGroup>
				{logoVis ? <ImgurBtn scss={ImgurColor} /> : null}
				{newPostVis ? <NewPostBtn scss={smallScreen(theme) + NewPostColor} /> : null}
			</StyledGroup>
			{searchBar ? <SearchBar /> : null}
			{identity ? (
				<StyledGroup>
					<ProfileBtn name={identity.userName} css={ProfileColor} />
					<LogOutBtn scss={mediumScreen(theme)} />
				</StyledGroup>
			) : (
				<StyledGroup>
					{signIn ? <SignInBtn scss={smallScreen(theme) + SignInColor} /> : null}
					{signUp ? <SignUpBtn scss={SignUpColor} /> : null}
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

var StyledBar = styled.div<CustomCss>`
	display: flex;
	align-content: center;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.4em 1em 0.4em 1em;
	${({ scss }) => scss};
`;

export default TitleBar;
