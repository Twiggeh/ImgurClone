import User from '../Models/User.js';
import { IResolver } from '../src/types.js';

interface GetUserResolverInput {
	email: string;
	userName?: string;
}

interface GetUserResolverResult {
	success: boolean;
	message: string;
	userName: string;
	email: string;
	profilePicture?: string;
}

export const GetUserResolver: IResolver<
	GetUserResolverInput,
	GetUserResolverResult
> = async (parent, { email, userName }) => {
	try {
		const UserQuey: GetUserResolverInput = { email };
		if (userName) UserQuey.userName = userName;

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
