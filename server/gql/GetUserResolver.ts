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
			message: `User found.`,
			success: true,
			email: user.email,
			userName: user.userName,
			profilePicture: user.profilePicture,
		};
	} catch (e) {
		console.error(e);
		return {
			message: `Could not find user : ${userName}`,
			success: false,
			email: 'example@example.com',
			userName: 'exampleName',
			profilePicture: '',
		};
	}
};
