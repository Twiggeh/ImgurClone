const Modals = (): JSX.Element | null => {
	const { modal, setModal } = ModalContext();

	if (!modal) return null;

	const { modalCss, content, closeBtnCss } = modal;

	return (
		<>
			<ModalContainer
				onClick={e => {
					e.preventDefault();
					setModal(undefined);
				}}>
				<ModalDialog display={modal ? 'block' : 'none'} modalCss={modalCss}>
					<CloseModalBtn
						closeBtnCss={closeBtnCss}
						onClick={e => {
							e.preventDefault();
							setModal(undefined);
						}}>
						{/*Add close button*/}
					</CloseModalBtn>
					{content}
				</ModalDialog>
			</ModalContainer>
		</>
	);
};

var CloseModalBtn = styled.button<{ closeBtnCss: string | undefined }>`
	padding: 0;
	border-width: 0;
	background: transparent;
	margin-top: -0.5em;
	${({ closeBtnCss }) => closeBtnCss}
`;

var ModalDialog = styled.dialog<{
	modalCss: string | undefined;
	display: 'none' | 'block';
}>`
	position: fixed;
	padding-top: 2em;
	border-style: solid;
	border-width: 1px;
	backdrop-filter: unset;
	filter: drop-shadow(0 0 1em rgba(200, 63, 134, 0.6)),
		${({ modalCss, theme, display }) => `
						border-color: ${console.log(theme)};
            display: ${display}
						${modalCss};
 `};
`;

var ModalContainer = styled.div`
	width: 100vw;
	height: 100vh;
	z-index: 100;
	background-color: 'rgba(0, 0, 0, .70)';
	position: fixed;
	display: flex;
	align-items: center;
	backdrop-filter: grayscale(1) blur(1px);
`;
export default Modals;

import React from 'react';
import styled from '@emotion/styled';
import { ModalContext } from '../../App';
