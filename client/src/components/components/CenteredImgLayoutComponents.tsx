import styled from '@emotion/styled';

export const SideBar = styled.div`
	position: sticky;
	top: 2vw;
	display: flex;
	justify-content: center;
	${props => props.theme.mq.phone} {
		position: fixed;
		top: 10vh;
		right: 2vw;
		background-color: ${props => props.theme.color.primary};
		align-items: center;
		width: 7em;
		height: 7em;
		border-radius: 50%;
		filter: drop-shadow(0 0 12px #171718);
		a {
			border-radius: 50%;
			height: 100%;
			width: 100%;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

export const Right = styled.div`
	align-self: stretch;
	flex: 0 1 100%;
	${props => props.theme.mq.phone} {
		flex: 0 1 10vw;
	}
`;

export const Left = styled.div`
	align-self: stretch;
	flex: 0 1 100%;
	${props => props.theme.mq.phone} {
		flex: 0 1 10vw;
	}
`;

export const Center = styled.div<CustomCss>`
	flex-direction: column;
	justify-content: center;
	flex: 0 1 100%;
	${props => props.theme.mq.phone} {
		flex: 0 1 100vw;
	}
	${props => props.css}
`;

export const CenteredLayoutWrap = styled.div<CustomCss>`
	display: flex;
	${props => props.css}
`;

export const CreatePostTitle = styled.h2`
	width: fit-content;
	font-size: ${props => props.theme.fontSize.big};
	margin: 0.5em auto 0.5em auto;
	font-weight: 400;
`;

export const CardImg = styled.img`
	display: block;
	width: 100%;
`;

export const CardTitleInput = styled.input`
	font-size: ${props => props.theme.fontSize.medium};
	background: transparent;
	border: 0;
	display: block;
	padding: 0.5vw 1vw;
	border-bottom: solid 1px transparent;
	&:focus {
		outline: none;
		border-bottom: solid 1px ${props => props.theme.color.fontColor};
	}
`;

export const CardTextArea = styled.textarea`
	font-size: ${props => props.theme.fontSize.small};
	background: ${props => props.theme.color.mediumBackground};
	border: 0;
	border-radius: var(--border-radius);
	resize: vertical;
	min-height: 120px;
	width: 100%;
	border-bottom: solid 1px transparent;
	padding: 1vw;
	border-bottom: solid 1px transparent;
	box-sizing: border-box;
	&:focus {
		outline: none;
		border-bottom: solid 1px ${props => props.theme.color.fontColor};
	}
`;

export const StyledCard = styled.div`
	margin-bottom: 4em;
	> * {
		margin-bottom: 1em;
	}
`;
