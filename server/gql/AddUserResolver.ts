import { IResolver } from '../src/types.js';
import User from '../Models/User.js';

interface AddUserResolverInput {
	email: string;
	password: string;
	userName: string;
}

interface AddUserResolverResult {
	success: boolean;
	message: string;
}

export const AddUserResolver: IResolver<
	AddUserResolverInput,
	AddUserResolverResult
> = async (parent, { email, password, userName }) => {
	const newUser = new User({
		email,
		password,
		userName,
	});
	try {
		const user = await newUser.save();
		return {
			message: `User : ${user.userName} has been created Successfully`,
			success: true,
		};
	} catch (e) {
		console.error(e);
		return { message: `Could not create user : ${userName}`, success: false };
	}
};
