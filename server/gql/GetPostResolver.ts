import Post, { IPost } from '../Models/Post.js';
import { IResolver } from '../src/types.js';

interface GetPostResolverInput {
	userName?: string;
	title?: string;
	userId?: string;
	description?: string;
	postId?: string;
}

interface GetPostResolverResult extends IPost {
	success: boolean;
	message: string;
}

export const GetPostResolver: IResolver<
	GetPostResolverInput,
	GetPostResolverResult
> = async (parent, { description, postId, title, userId, userName }) => {
	try {
		const PostQuery: GetPostResolverInput = {};
		if (userName) PostQuery.userName = userName;
		if (postId) PostQuery.postId = postId;

		const post = await Post.findOne(PostQuery);
		if (post)
			return {
				message: `Post found.`,
				success: true,
				title: post.title,
				userId: post.userId,
				userName: post.userName,
				comments: post.comments,
				description: post.description,
				picture: post.picture,
				profilePicture: post.profilePicture,
				addedDate: post.addedDate,
			};
		else throw 'No Post found';
	} catch (e) {
		console.error(e);
		return {
			message: `Could not find any post.`,
			success: false,
			title: 'No post Found',
			userId: '1234',
			userName: 'No one',
			description: 'No post Found, try other parameters',
			addedDate: Date.now(),
		};
	}
};
