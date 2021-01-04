export const getUrlFromLocation = (location: string) => {
	if (location.startsWith('http') || location.startsWith('https')) return location;
	return BACKEND_SERVER_URL + location;
};

export const debounce = (func: () => void, wait: number, immediate?: boolean) => {
	let timeout: NodeJS.Timeout | undefined;

	return () => {
		const later = () => {
			timeout = undefined;
			if (!immediate) func();
		};

		const callNow = immediate && !timeout;

		clearTimeout(Number(timeout));

		timeout = setTimeout(later, wait);

		if (callNow) func();
	};
};
