import { FilterQuery, LeanDocument } from 'mongoose';
import { deNull } from '../utils/utils.js';
import { QueryGetUserArgs, QueryResolvers, ResolversTypes } from '../generated/gql.js';
import User, { UserDocument } from '../Models/User.js';

export const GetUserFn = async ({
	userName,
	mongoId,
}: QueryGetUserArgs): Promise<ResolversTypes['GetUserResult']> => {
	try {
		const UserQuey: FilterQuery<LeanDocument<UserDocument>> = {
			userName: deNull(userName),
		};

		const user = mongoId ? await User.findById(mongoId) : await User.findOne(UserQuey);

		if (!user) throw 'Could not find specified user.';

		return {
			__typename: 'GetUserSuccess',
			message: `User found.`,
			userName: user.userName,
			profilePicture: user.profilePicture,
		};
	} catch (e) {
		console.error(e);
		return {
			__typename: 'GetUserFailure',
			message: `Could not find user : ${userName}`,
		};
	}
};

export const GetUserResolver: QueryResolvers['getUser'] = async (_, args) =>
	GetUserFn(args);
