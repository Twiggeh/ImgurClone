import { IResolver } from '../src/types.js';
import User, { IUser } from '../Models/User.js';

interface AddUserResolverResult {
	success: boolean;
	message: string;
}

export const AddUserResolver: IResolver<IUser, AddUserResolverResult> = async (
	parent,
	{ email, password, userName, profilePicture }
) => {
	const user: IUser = {
		email,
		password,
		userName,
		profilePicture,
	};
	const newUser = new User(user);
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
