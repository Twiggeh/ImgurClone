import { GetUserFn } from '../gql/GetUserResolver.js';
import type { MyContext } from '../@types/global';
import { deNull } from '../utils/utils.js';

export const fetchCurrentUser = async (
	mongoId: string
): Promise<MyContext['currentUser']> => {
	const data = await GetUserFn({ mongoId });
	if (data.__typename === 'GetUserSuccess')
		return {
			userName: data.userName,
			profilePicture: deNull(data.profilePicture),
			mongoId,
		};

	return {
		userName: undefined,
		mongoId: undefined,
		profilePicture: undefined,
	};
};
