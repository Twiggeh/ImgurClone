import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { css, Global, ThemeProvider } from '@emotion/react';
import createCtx from './components/Providers/createStateCtx';
import { Modal } from 'main';

const theme = {
	color: {
		accent: 'hotpink',
		primary: 'aqua',
		background: 'gray',
		border: 'lightGray',
		darkBackground: 'darkGray',
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
			<ThemeProvider theme={theme}>
				<ModelProvider value={{ modal, setModal }}></ModelProvider>
			</ThemeProvider>
		</>
	);
};

export default hot(App);

var globalStyle = css`
	* {
		::selection {
			color: white;
			background: ${theme.color.accent};
		}
		font-family: Montserrat;
		::-webkit-scrollbar-track {
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3) inset;
			${theme.mq.tablet} {
				${theme.customOutline(0, 0, 0, 1)}
			}
		}
		::-webkit-scrollbar {
			width: 18px;
			background-color: ${theme.color.background};
		}
		::-webkit-scrollbar-thumb {
			border: 1px solid ${theme.color.border};
			background-color: ${theme.color.darkBackground};
			:hover {
				border-color: ${theme.color.accent};
			}
		}
	}
	body {
		--trueWidth: 100%;
	}
`;
