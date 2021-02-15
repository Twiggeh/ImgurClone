import React from 'react';
import styled from '@emotion/styled';

type StyledProps = Pick<ButtonProps, 'bgColor' | 'fColor' | 'disabled'>;

const StyledButton = styled.a<StyledProps & CustomCss>`
	padding: 0.7em 1em 0.7em 1em;
	border-radius: var(--borderRadius);
	text-decoration: none;
	display: inline-block;
	text-align: center;
	${({ bgColor, fColor, disabled, theme, scss }) => `
    background-color: ${bgColor ? bgColor : theme.color.primary};
    color: ${fColor};
    ${disabled ? 'filter: grayscale(70%);cursor: not-allowed;' : 'pointer-events:all;'}
    ${scss}`}
`;

export interface ButtonProps {
	bgColor?: string;
	fColor?: string;
	href?: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	disabled?: boolean;
	css?: string;
}

const Button: React.FC<ButtonProps & CustomCss> = ({
	bgColor,
	fColor = 'white',
	onClick,
	href = '',
	disabled = false,
	children,
	scss,
}) => {
	return (
		<StyledButton
			fColor={fColor}
			bgColor={bgColor}
			href={href}
			onClick={disabled ? e => e.preventDefault() : onClick}
			disabled={disabled}
			scss={scss}>
			{children}
		</StyledButton>
	);
};

export default Button;
