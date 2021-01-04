import { QueryResolvers } from '../generated/gql.js';
import { Document, Model } from 'mongoose';
import Post, { IPost, PostDocument, PostModel } from '../Models/Post.js';
import { Optional } from '../src/types.js';
import { PAGINATION_DEFAULT } from '../src/globals.js';
import { AddPostResolver } from './AddPostResolver.js';

const paginatedSearch = <T extends Document, U extends Model<T>>(
	model: U,
	page: number,
	postQuery: Optional<T & Document> = {},
	lastObjId: string | undefined
) => {
	if (!lastObjId) {
		if (postQuery._id) {
			return model.findById(postQuery._id).sort({ _id: -1 }).limit(PAGINATION_DEFAULT);
		}
		// @ts-ignore
		return model.find(postQuery).sort({ _id: -1 }).limit(PAGINATION_DEFAULT);
	}
	// TODO : Implement pagination without lastObjectId
	// @ts-ignore
	return (
		model
			// @ts-ignore
			.find({ _id: { $gt: lastObjId }, ...postQuery })
			.sort({ _id: -1 })
			.limit(PAGINATION_DEFAULT)
	);
};

export const GetPostResolver: QueryResolvers['getPost'] = async (
	_,
	{ postId, userId, userName, lastObjId, page = 0 }
) => {
	try {
		const postQuery: Optional<IPost & Document> = {};
		if (userName) postQuery.userName = userName;
		if (postId) postQuery._id = postId;
		if (userId) postQuery.userId = userId;

		const posts = await paginatedSearch<PostDocument, PostModel>(
			Post,
			page,
			postQuery,
			lastObjId
		);

		if (Array.isArray(posts) && posts.length !== 0)
			return {
				__typename: 'PostSuccess',
				message: 'Post(s) found.',
				success: true,
				page: (page += 1),
				posts: posts.map(post => {
					post.postId = post.id;
					return post;
				}),
			};
		else if (!Array.isArray(posts) && posts) {
			posts.postId = posts._id;
			return {
				__typename: 'PostSuccess',
				message: 'Post(s) found.',
				success: true,
				page: (page += 1),
				posts: [posts],
			};
		} else
			return {
				__typename: 'PostFailure',
				message: 'No Post found',
			};
	} catch (e) {
		console.error(e);
		return {
			__typename: 'PostFailure',
			message: 'Could not find any post.',
		};
	}
};
