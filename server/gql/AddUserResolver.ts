import User, { IUser } from '../Models/User.js';
import { Resolvers } from 'generated/gql.js';

export const AddUserResolver: Resolvers['Mutation']['addUser'] = async (
	parent,
	{ AddUserInput: { userName, profilePicture, google, local } }
) => {
	const user: IUser = {
		userName,
		profilePicture,
	};

	const newUser = new User(user);
	const errors: string[] = [];

	if (!google && !local) return { message: 'No auth provider provided', success: false };

	if (google) {
		if (!google.accessToken || !google.refreshToken || !google.email) {
			errors.push(
				`Not all google relevant data has been provided :
( AccessToken : ${Boolean(google.accessToken)},
  RefreshToken :${Boolean(google.refreshToken)},
  Email: ${Boolean(google.email)} )`
			);
		}
		newUser.google.accessToken = google.accessToken;
		newUser.google.email = google.email;
		newUser.google.refreshToken = google.refreshToken;
	}

	if (local) {
		if (local.password !== local.verifyPassword)
			errors.push(`User : ${userName} could not be created. Passwords do not match`);

		newUser.local.password = local.password;
		newUser.local.email = local.email;
	}

	if (errors.length)
		return {
			message: errors.join('\n'),
			success: false,
		};

	try {
		const user = await newUser.save();
		return {
			message: `User : ${user.userName} has been created Successfully`,
			success: true,
		};
	} catch (e: unknown) {
		console.error(e);
		if (e instanceof Error) {
			return {
				message: `Could not create user : ${userName}; Error: ${e.message}`,
				success: false,
			};
		}
		return {
			message: `Could not create user : ${userName}; Error: ${e}`,
			success: false,
		};
	}
};
