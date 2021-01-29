import User, { IUser } from '../Models/User.js';
import { MutationAddUserArgs, Resolvers, ResolversTypes } from '../generated/gql.js';

export const AddUserFn = async ({
	AddUserInput: { userName, profilePicture, google, local },
}: MutationAddUserArgs): Promise<ResolversTypes['AddUserResult']> => {
	const user: IUser = {
		userName,
		profilePicture,
		google,
		local,
	};

	const newUser = new User(user);

	try {
		const user = await newUser.save();
		return {
			message: `User : ${user.userName} has been created Successfully`,
			id: newUser.id,
			__typename: 'AddUserSuccess',
		};
	} catch (e: unknown) {
		console.error(e);
		if (e instanceof Error) {
			return {
				message: `Could not create user : ${userName}; Error: ${e.message}`,
				__typename: 'AddUserFailure',
			};
		}
		return {
			message: `Could not create user : ${userName}; Error: ${e}`,
			__typename: 'AddUserFailure',
		};
	}
};

export const AddUserResolver: Resolvers['Mutation']['addUser'] = async (parent, args) =>
	await AddUserFn(args);
