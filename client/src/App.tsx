import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { css, Global, Theme, ThemeProvider } from '@emotion/react';
import createCtx from './components/Providers/createStateCtx';
import Body from './components/Body_index';
import './assets/global.css';

import {
	ApolloClient,
	NormalizedCacheObject,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	credentials: 'include',
	link: createUploadLink({
		credentials: 'include',
		uri: `${BACKEND_SERVER_URL}/graphql`,
	}),
});

const theme: Theme = {
	fontSize: {
		mini: 'clamp(12px, 1vw, 25px)',
		small: 'clamp(18px, 1.2vw, 35px)',
		medium: 'clamp(28px, 2vw, 45px)',
		big: 'clamp(40px, 4vw, 200px)',
	},
	color: {
		accent: 'hotpink',
		primary: '#0066ff',
		danger: '#ff7373',
		success: '#1b942f',
		border: 'lightGray',
		fontColor: '#fff',
		lowContrastFont: '#818181',
		lightBackground: '#38383b',
		mediumBackground: '#252528',
		background: '#1c1d20',
	},
	mq: {
		tablet: '@media (max-width: 1400px)',
		phone: '@media (max-width: 700px)',
	},
	customOutline: (top = 0, right = 0, bottom = 0, left = 0) => {
		return `
			border-color: ${theme.color.border};
			border-top-width: ${top}px;
			border-bottom-width: ${bottom}px;
			border-left-width: ${left}px;
			border-right-width: ${right}px;
			border-style: solid;
		`;
	},
};

const [context, ModelProvider] = createCtx<{
	modal: Modal;
	setModal: React.Dispatch<React.SetStateAction<Modal>>;
}>();

export const ModalContext = context;

const App = () => {
	const [modal, setModal] = useState<Modal>();

	return (
		<>
			<Global styles={globalStyle} />
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<ModelProvider value={{ modal, setModal }}>
						<Body />
					</ModelProvider>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
};

export default hot(App);

var globalStyle = css`
	* {
		font-family: Montserrat;
		color: ${theme.color.fontColor};
		::selection {
			color: white;
			background: ${theme.color.accent};
		}
		::-webkit-scrollbar-track {
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
			${theme.mq.tablet} {
				${theme.customOutline(0, 0, 0, 1)}
			}
		}
		::-webkit-scrollbar {
			width: 18px;
			background-color: ${theme.color.lightBackground};
		}
		::-webkit-scrollbar-thumb {
			border: 1px solid ${theme.color.border};
			background-color: ${theme.color.background};
			:hover {
				border-color: ${theme.color.accent};
			}
		}
	}
	body {
		--trueWidth: 100%;
		--borderRadius: 0.25em;
	}
`;
