import { Document } from 'mongoose';
import Post, { IPost } from '../Models/Post.js';
import { IResolver, Optional } from '../src/types.js';

interface GetPostResolverInput {
	userName?: string;
	userId?: string;
	postId?: string;
}

type GetPostResolverResult = GetPostFailure | GetPostSuccess;

type GetPostFailure = {
	success: false;
	message: string;
};

type GetPostSuccess = {
	success: true;
	message: string;
	posts: IPost[];
};

export const GetPostResolver: IResolver<
	GetPostResolverInput,
	GetPostResolverResult
> = async (parent, { postId, userId, userName }) => {
	try {
		const PostQuery: Optional<IPost & Document> = {};
		if (userName) PostQuery.userName = userName;
		if (postId) PostQuery._id = postId;
		if (userId) PostQuery.userId = userId;

		const posts = await Post.find(PostQuery);
		if (posts.length !== 0)
			return {
				message: `Post(s) found.`,
				success: true,
				posts: posts,
			};
		else
			return {
				message: 'No Post found',
				success: false,
			};
	} catch (e) {
		console.error(e);
		return {
			message: `Could not find any post.`,
			success: false,
		};
	}
};
