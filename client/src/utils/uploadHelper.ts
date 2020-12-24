export const bindLocalStore = <T>(
	_reactDispatch: React.Dispatch<React.SetStateAction<T>>,
	localStoreDispatch: (value: T) => void
) => {
	return (input: T | ((input: T) => T)): void => {
		if (input instanceof Function) {
			_reactDispatch(c => {
				const currentData = input(c);
				localStoreDispatch(currentData);
				return currentData;
			});
			return;
		}
		_reactDispatch(input);
		localStoreDispatch(input);
	};
};
