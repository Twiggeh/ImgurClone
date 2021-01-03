import { GetUserFn } from '../gql/GetUserResolver.js';
import type { MyContext } from '../@types/global';

export const fetchCurrentUser = async (
	mongoId: string
): Promise<MyContext['currentUser']> => {
	const data = await GetUserFn({ mongoId });
	if (data.__typename === 'GetUserSuccess')
		return { userName: data.userName, profilePicture: data.profilePicture, mongoId };

	return null;
};
