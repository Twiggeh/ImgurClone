import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			accent: string;
			primary: string;
			mediumBackground: string;
			background: string;
			border: string;
			lightBackground: string;
			fontColor: string;
			lowContrastFont: string;
		};
		mq: {
			tablet: string;
			phone: string;
		};
		fontSize: {
			mini: string;
			small: string;
			medium: string;
			big: string;
		};
		customOutline: (top: number, right: number, bottom: number, left: number) => string;
	}
}
