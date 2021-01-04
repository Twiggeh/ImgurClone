import { QueryResolvers } from '../generated/gql.js';

// @ts-ignore
export const GetMeResolver: QueryResolvers['getMe'] = (_, args, { currentUser }) => {
	if ('mongoId' in currentUser) {
		return currentUser;
	}
	return null;
};
