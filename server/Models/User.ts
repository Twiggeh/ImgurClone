import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const SALT_WORK = 10;

const reqGoogle = function (this: IUser) {
	return !(this.local && this.local.email && this.local.password);
};

const reqLocal = function (this: IUser) {
	return !(
		this.google &&
		this.google.email &&
		this.google.accessToken &&
		this.google.refreshToken
	);
};

const UserSchema = new mongoose.Schema<IUser>({
	userName: {
		required: true,
		type: String,
	},
	profilePicture: {
		required: false,
		type: String,
	},
	local: {
		email: { required: reqLocal, type: String, unique: true },
		password: { required: reqLocal, type: String },
	},
	google: {
		accessToken: { required: reqGoogle, type: String },
		refreshToken: { required: reqGoogle, type: String },
		name: { required: reqGoogle, type: String },
		email: { required: reqGoogle, type: String, unique: true },
	},
});

UserSchema.pre<UserDocument>('save', async function (next) {
	try {
		// Hash password
		if (this.isModified(this.local.password)) {
			const salts = await genSalt(SALT_WORK);
			const hashedPass = await hash(this.local.password, salts);
			this.local.password = hashedPass;
		}

		return next();
	} catch (e) {
		throw new Error(e);
	}
});

export interface IUser {
	userName: string;
	profilePicture?: string;
	local?: { email: string; password: string };
	google?: {
		accessToken: string;
		refreshToken: string;
		email: string;
	};
}

interface UserDocument extends IUser, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument> {}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;
