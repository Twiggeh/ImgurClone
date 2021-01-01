import { QueryResolvers } from '../generated/gql.js';

export const GetMeResolver: QueryResolvers['getMe'] = (_, args, context) =>
	context.currentUser;
