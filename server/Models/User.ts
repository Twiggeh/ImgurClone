import mongoose from 'mongoose';
import { genSalt, hash } from 'bcrypt';

const SALT_WORK = 10;

const LocalSchema = new mongoose.Schema({
	email: { required: true, type: String, unique: true },
	password: { required: true, type: String },
});

const GoogleSchema = new mongoose.Schema({
	email: { required: true, type: String, unique: true },
	accessToken: { required: true, type: String },
	refreshToken: { required: true, type: String },
});

const UserSchema = new mongoose.Schema<IUser>({
	userName: {
		required: true,
		type: String,
	},
	profilePicture: {
		required: false,
		type: String,
	},
	local: LocalSchema,
	google: GoogleSchema,
});

UserSchema.pre<UserDocument>('save', async function (next) {
	const authMethod = this.google && this.local ? 'all' : this.google ? 'google' : 'local';

	// UNIQUENESS QUERIES
	if (authMethod === 'all') {
		const document = await User.find({
			$or: [{ 'local.email': this.local.email }, { 'google.email': this.google.email }],
		});
		if (document.length)
			throw new Error(
				`User with email ${this.google.email} / ${this.local.email} already exists.`
			);
	}
	if (authMethod === 'local') {
		const document = await User.find({ 'local.email': this.local.email });
		if (document.length)
			throw new Error(`User with email ${this.local.email} already exists.`);
	}
	if (authMethod === 'google') {
		const document = await User.find({ 'google.email': this.google.email });
		if (document.length)
			throw new Error(`User with email ${this.google.email} already exists.`);
	}

	try {
		// Hash password
		if (authMethod === 'all' || authMethod === 'local') {
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
