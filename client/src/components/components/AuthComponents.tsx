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
	display: flex;
	right: 1em;
	top: 0%;
	height: 100%;
	justify-content: center;
	align-items: center;
	svg {
		min-width: 2.5em;
		width: 2.5em;
	}
`;

export const PassWrap = styled.div`
	position: relative;
`;

export const SpaceItems = styled.div`
	& > * {
		margin-bottom: 1em;
	}
`;

export const MiniTitle = styled.h4<CustomCss>`
	font-size: ${({ theme }) => theme.fontSize.mini};
	text-align: center;
	font-weight: 500;
	${props => props.scss}
`;

export const CenteredFormPage = styled.div`
	min-height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: ${props => props.theme.color.background};
`;

export const AlignRight = styled.div<CustomCss>`
	display: flex;
	justify-content: flex-end;
	${props => props.scss}
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

export const Center = styled.div<CustomCss>`
	display: flex;
	flex-direction: column;
	align-items: center;
	${props => props.scss}
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
	position: relative;
	user-select: none;
	position: relative;
`;

export const StyledLabelError = styled.span`
	margin-left: 1em;
	user-select: none;
	color: ${({ theme }) => theme.color.danger};
	right: 0;
	position: absolute;
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
	${({ scss }) => scss}
`;

import React from 'react';

interface IEmailError {
	emailValid: boolean | undefined;
	emailVisited: boolean;
}

export const EmailError: React.FC<IEmailError> = ({
	emailValid: validEmail,
	emailVisited,
}) => {
	const showEmailError: boolean = !emailVisited || validEmail ? false : true;

	if (!showEmailError) return null;

	return <StyledLabelError>- Email incorrectly formatted</StyledLabelError>;
};

interface PasswordError {
	password: boolean | undefined;
	confirmPassword: boolean | undefined;
	confirmPasswordVisited: boolean;
}

export const PasswordError: React.FC<PasswordError> = ({
	password,
	confirmPassword,
	confirmPasswordVisited,
}) => {
	if ((confirmPassword && password) || !confirmPasswordVisited) return null;

	return <StyledLabelError>- Passwords do not match</StyledLabelError>;
};
