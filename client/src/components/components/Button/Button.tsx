import React from 'react';
import styled from '@emotion/styled';

type StyledProps = Pick<ButtonProps, 'bgColor' | 'fColor' | 'disabled'>;

const StyledButton = styled.a<StyledProps>`
	padding: 0.7em 1em 0.7em 1em;
	border-radius: var(--borderRadius);
	text-decoration: none;
	display: inline-block;
	text-align: center;
	${({ bgColor, fColor, disabled, theme }) => `
background-color: ${bgColor ? bgColor : theme.color.primary};
color: ${fColor};
${disabled ? 'filter: grayscale(70%);cursor: not-allowed;' : 'pointer-events:all;'}`}
`;

export interface ButtonProps {
	content: string;
	bgColor?: string;
	fColor?: string;
	href?: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	content = '',
	bgColor,
	fColor = 'white',
	onClick,
	href = '',
	disabled = false,
}) => {
	return (
		<StyledButton
			fColor={fColor}
			bgColor={bgColor}
			href={href}
			onClick={disabled ? e => e.preventDefault() : onClick}
			disabled={disabled}>
			{content}
		</StyledButton>
	);
};

export default Button;
