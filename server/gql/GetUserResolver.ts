import { QueryGetUserArgs, QueryResolvers, ResolversTypes } from '../generated/gql.js';
import User from '../Models/User.js';

export const GetUserFn = async ({
	email,
	userName,
	mongoId,
}: QueryGetUserArgs): Promise<ResolversTypes['GetUserResult']> => {
	try {
		const UserQuey = { email, userName };

		const user = mongoId ? await User.findById(mongoId) : await User.findOne(UserQuey);

		return {
			__typename: 'GetUserResultSuccess',
			message: `User found.`,
			userName: user.userName,
			profilePicture: user.profilePicture,
		};
	} catch (e) {
		console.error(e);
		return {
			__typename: 'GetUserResultFailure',
			message: `Could not find user : ${userName}`,
		};
	}
};

export const GetUserResolver: QueryResolvers['getUser'] = async (_, args) =>
	GetUserFn(args);
