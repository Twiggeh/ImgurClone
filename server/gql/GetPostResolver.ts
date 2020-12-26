import { QueryResolvers } from '../generated/gql.js';
import { Document } from 'mongoose';
import Post, { IPost } from '../Models/Post.js';
import { IResolver, Optional } from '../src/types.js';

export const GetPostResolver: QueryResolvers['getPost'] = async (
	_,
	{ postId, userId, userName }
) => {
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
				posts: posts.map(post => {
					post.postId = post.id;
					return post;
				}),
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
