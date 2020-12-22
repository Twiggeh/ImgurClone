import styled from '@emotion/styled';

const leftPad = '0.8em';

export const StyledBackToHome = styled.div`
	padding: 2em;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
`;

export const PassVisToggle = styled.p`
	position: absolute;
	left: 80%;
	top: 0%;
	height: 100%;
`;

export const PassWrap = styled.div`
	position: relative;
`;

export const SpaceItems = styled.div`
	& > * {
		margin-bottom: 1em;
	}
`;

export const SmallHeader = styled.h4`
	font-size: ${({ theme }) => theme.fontSize.mini};
	text-align: center;
	font-weight: 500;
`;

export const CenteredFormPage = styled.div`
	min-height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: ${props => props.theme.color.background};
`;

type CustomCss = { css?: string };

export const AlignRight = styled.div<CustomCss>`
	display: flex;
	justify-content: flex-end;
	${props => props.css}
`;

export const LayoutLogins = styled.div`
	display: flex;
	& > * {
		flex-grow: 1;
	}
	* + * {
		margin-left: ${leftPad};
	}
	padding: ${leftPad};
	border-radius: export const(--borderRadius);
	background-color: ${({ theme }) => theme.color.lightBackground};
`;

export const Center = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledForm = styled.form`
	background: ${props => props.theme.color.lightBackground};
	border-radius: export const(--borderRadius);
	display: inline-block;
	padding: ${leftPad};
`;

export const StyledLabel = styled.label`
	&:not(:first-child) {
		padding-top: ${leftPad};
	}
	display: block;
	font-weight: 500;
`;

export const StyledInput = styled.input<CustomCss>`
	margin-top: ${leftPad};
	padding: 0.7em 0.5em 0.7em 0.5em;
	display: block;
	border: 0;
	border-radius: var(--borderRadius);
	background-color: ${props => props.theme.color.mediumBackground};
	color: ${props => props.theme.color.fontColor};
	min-width: 350px;
	width: 30vw;
	::placeholder {
		color: #c0c0c0;
	}
	${({ css }) => css}
`;
