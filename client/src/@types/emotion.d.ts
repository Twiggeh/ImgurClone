import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		color: {
			accent: string;
			primary: string;
			background: string;
			border: string;
			darkBackground: string;
		};
	}
}
