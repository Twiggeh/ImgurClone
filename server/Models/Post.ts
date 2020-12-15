import mongoose from 'mongoose';
import { Comment, CommentSchema } from './Comment.js';

const PostSchema = new mongoose.Schema({
	userId: {
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
	title: {
		required: true,
		type: String,
	},
	description: {
		required: function () {
			return this.description || this.picture;
		},
		type: String,
	},
	picture: {
		required: function () {
			return this.description || this.picture;
		},
		type: String,
	},
	addedDate: {
		required: true,
		type: Date,
		default: Date.now(),
	},
	comments: [CommentSchema],
});

export interface IPost {
	userId: string;
	userName: string;
	profilePicture?: string;
	title: string;
	description?: string;
	picture?: string;
	addedDate: number;
	comments?: Comment[];
}

interface PostDocument extends IPost, mongoose.Document {}

export interface PostModel extends mongoose.Model<PostDocument> {}

const Post = mongoose.model<PostDocument, PostModel>('Post', PostSchema);

export default Post;
