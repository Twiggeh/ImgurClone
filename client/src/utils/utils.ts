export const getUrlFromLocation = (location: string) => {
	if (location.startsWith('http') || location.startsWith('https')) return location;
	return BACKEND_SERVER_URL + location;
};
