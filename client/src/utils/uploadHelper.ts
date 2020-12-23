export const bindLocalStore = <T>(
	_reactDispatch: React.Dispatch<React.SetStateAction<T>>,
	localStoreDispatch: (value: T) => void
) => {
	return (input: T | ((input: T) => T)): void => {
		if (input instanceof Function) {
			let currentData: T | any;

			_reactDispatch(c => {
				currentData = input(c);
				return currentData as T;
			});

			localStoreDispatch(currentData as T);
			return;
		}
		_reactDispatch(input);
		localStoreDispatch(input);
	};
};
