import { UpdateQuery } from 'mongoose';
import { deNull } from '../utils/utils.js';
import {
	MutationResolvers,
	MutationSetUserArgs,
	ResolversTypes,
} from '../generated/gql.js';
import User, { UserDocument } from '../Models/User.js';

export const SetUserFn = async (
	{ setUserInput: { userName, profilePicture, google, local } }: MutationSetUserArgs,
	mongoId?: string
): Promise<ResolversTypes['GetUserResult']> => {
	if (!mongoId)
		return {
			__typename: 'GetUserFailure',
			message: 'Cannot set properties for non existent mongoId',
		};

	const update: UpdateQuery<UserDocument> = {
		google: deNull(google),
		local: deNull(local),
		userName,
		profilePicture: deNull(profilePicture),
	};

	// ES6 TS implementation is broken.
	for (const key in update) {
		// @ts-ignore
		if (!update[key]) {
			// @ts-ignore
			delete update[key];
		}
	}

	try {
		const user = await User.findByIdAndUpdate(mongoId, update, { new: true });

		if (!user)
			return {
				__typename: 'GetUserFailure',
				message: `Could not find user : ${userName}`,
			};

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
			message: `Could not update user : ${userName}`,
		};
	}
};

export const SetUserResolver: MutationResolvers['setUser'] = async (_, args, context) =>
	SetUserFn(args, context.currentUser?.mongoId);
