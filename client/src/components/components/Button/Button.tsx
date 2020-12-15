import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.a`
	${({ color }) => `background-color: ${color}`}
`;

export interface ButtonProps {
	content: string;
	color: string;
	type: HTMLButtonElement['type'];
	href: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ content = '', color, onClick, type, href }) => {
	return (
		<StyledButton
			color={color}
			href={href}
			onClick={onClick ? onClick : null}
			type={type}>
			{content}
		</StyledButton>
	);
};

export default Button;
