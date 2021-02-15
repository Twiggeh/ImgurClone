export const getUrlFromLocation = (location: string) => {
	if (location.startsWith('http') || location.startsWith('https')) return location;
	return BACKEND_SERVER_URL + location;
};

export const debounce = (func: () => void, wait: number, immediate?: boolean) => {
	let timeout: number | undefined;

	return () => {
		const later = () => {
			timeout = undefined;
			if (!immediate) func();
		};

		const callNow = immediate && !timeout;

		window.clearTimeout(timeout);

		timeout = window.setTimeout(later, wait);

		if (callNow) func();
	};
};
