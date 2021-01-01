import mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
	userId: {
		required: true,
		type: String,
	},
	userName: {
		required: true,
		type: String,
	},
	content: {
		required: true,
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
});

export interface Comment {
	userId: string;
	userName: string;
	profilePicture?: string;
	content: string;
	addedDate: number;
}

interface CommentDocument extends Comment, mongoose.Document {}

export interface CommentModel extends mongoose.Model<CommentDocument> {}

const Comment = mongoose.model<CommentDocument, CommentModel>('Comment', CommentSchema);

export default Comment;
