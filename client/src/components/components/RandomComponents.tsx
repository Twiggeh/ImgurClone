import styled from '@emotion/styled';

export const StyledBigTitle = styled.h1<CustomCss>`
	margin: 0.5em 0 0.5em 0;

	font-size: ${props => props.theme.fontSize.big};
	${props => props.css}
`;

export const StyledMediumTitle = styled.h2<CustomCss>`
	margin: 0.8em 0 0.8em 0;
	font-size: ${props => props.theme.fontSize.medium};
	${props => props.css}
`;

export const StyledSmallTitle = styled.h3<CustomCss>`
	margin: 1em 0 1em 0;
	font-size: ${props => props.theme.fontSize.small};
	${props => props.css}
`;
