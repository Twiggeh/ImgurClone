import React from 'react';
import styled from '@emotion/styled';

type StyledProps = Pick<ButtonProps, 'bgColor' | 'fColor' | 'disabled'>;

const StyledButton = styled.a<StyledProps>`
	${({ bgColor, fColor, disabled, theme }) =>
		`background-color: ${bgColor ? bgColor : theme.color.primary};
		color: ${fColor};
	${disabled ? 'pointer-events:none;' : 'pointer-events:all;'}`}
`;

export interface ButtonProps {
	content: string;
	bgColor?: string;
	fColor?: string;
	href: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	content = '',
	bgColor,
	fColor = 'white',
	onClick,
	href,
	disabled = false,
}) => {
	return (
		<StyledButton
			fColor={fColor}
			bgColor={bgColor}
			href={href}
			onClick={onClick}
			disabled={disabled}>
			{content}
		</StyledButton>
	);
};

export default Button;
