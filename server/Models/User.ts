import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		required: true,
		type: String,
		unique: true,
	},
	password: {
		required: true,
		type: String,
	},
	userName: {
		required: true,
		type: String,
	},
	profilePicture: {
		required: false,
		type: String,
	},
});

export interface User {
	email: string;
	password: string;
	userName: string;
	profilePicture?: string;
}

interface UserDocument extends User, mongoose.Document {}

export interface UserModel extends mongoose.Model<UserDocument> {}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;
