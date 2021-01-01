import { GetUserFn } from 'gql/GetUserResolver';

export interface User {
	userName: string;
	profilePicture?: string;
}

export const fetchCurrentUser = async (mongoId: string): Promise<User> => {
	const data = await GetUserFn({ mongoId });
	if (data.__typename === 'GetUserResultSuccess')
		return { userName: data.userName, profilePicture: data.profilePicture };

	return null;
};
