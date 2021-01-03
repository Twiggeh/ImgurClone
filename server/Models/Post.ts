import mongoose from 'mongoose';
import { Comment, CommentSchema } from './Comment.js';
import { CardSchema, ICard } from './Card.js';

const PostSchema = new mongoose.Schema({
	userId: {
		required: true,
		type: String,
	},
	userName: {
		required: false,
		type: String,
	},
	profilePicture: {
		required: false,
		type: String,
	},
	addedDate: {
		required: true,
		type: Date,
		default: Date.now(),
	},
	cards: [CardSchema],
	comments: [CommentSchema],
});

export interface IPost {
	postId: string;
	userId: string;
	userName?: string;
	profilePicture?: string;
	addedDate: number;
	comments?: Comment[];
	cards: ICard[];
}

interface PostDocument extends IPost, mongoose.Document {}

export interface PostModel extends mongoose.Model<PostDocument> {}

const Post = mongoose.model<PostDocument, PostModel>('Post', PostSchema);

export default Post;
