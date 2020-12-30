import { QueryResolvers } from '../generated/gql.js';
import User from '../Models/User.js';

export const GetUserResolver: QueryResolvers['getUser'] = async (
	_,
	{ email, userName }
) => {
	try {
		const UserQuey = { email, userName };

		const user = await User.findOne(UserQuey);
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
