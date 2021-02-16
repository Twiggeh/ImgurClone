// prettier-ignore
type Modal =
	| {
			modalCss?: string;
			content: JSX.Element;
			closeBtnCss: string;
		}
	| undefined;

type ImgurDate = string;

type ImgurUpload<T> = {
	file?: T;
	files?: T[];
};

interface CustomCss {
	scss?: string;
}

declare const BACKEND_SERVER_URL: string;
