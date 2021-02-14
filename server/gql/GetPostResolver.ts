import { Comment, Post as GeneratedPostType, QueryResolvers } from '../generated/gql.js';
import { FilterQuery, LeanDocument } from 'mongoose';
import Post, { PostDocument, PostModel } from '../Models/Post.js';
import { PAGINATION_DEFAULT } from '../src/globals.js';
import { deNull } from '../utils/utils.js';

const paginatedSearch = async (
	model: PostModel,
	page: number,
	postQuery: FilterQuery<LeanDocument<PostDocument>>,
	lastObjId: string | undefined
) => {
	if (!lastObjId) {
		if (postQuery._id) {
			const result = await model
				.findById(postQuery._id)
				.sort({ _id: -1 })
				.limit(PAGINATION_DEFAULT)
				.lean();
			return [deNull(result)];
		}

		return model.find(postQuery).sort({ _id: -1 }).limit(PAGINATION_DEFAULT).lean();
	}
	// TODO : Implement pagination without lastObjectId

	return model
		.find({ _id: { $gt: lastObjId }, ...postQuery })
		.sort({ _id: -1 })
		.limit(PAGINATION_DEFAULT)
		.lean();
};

export const GetPostResolver: QueryResolvers['getPost'] = async (
	_,
	{ postId, userId, userName, lastObjId, page }
) => {
	page = deNull(page, 0);
	try {
		const postQuery: FilterQuery<LeanDocument<PostDocument>> = {};
		if (userName) postQuery.userName = userName;
		if (postId) postQuery._id = postId;
		if (userId) postQuery.userId = userId;

		const posts = await paginatedSearch(Post, page, postQuery, deNull(lastObjId));

		const transformPosts = (posts: LeanDocument<PostDocument>[]): GeneratedPostType[] => {
			return posts.map(
				(post: LeanDocument<PostDocument>): GeneratedPostType => {
					const mappedComments: undefined | Comment[] = Array.isArray(post.comments)
						? post.comments.map(comment => ({
								...comment,
								__typename: 'Comment',
						  }))
						: undefined;

					return {
						...post,
						__typename: 'Post',
						postId: post._id.toString(),
						cards: post.cards.map(card => ({ ...card, __typename: 'CardOut' })),
						comments: mappedComments,
					};
				}
			);
		};

		if (posts.length !== 0)
			return {
				__typename: 'PostSuccess',
				message: 'Post(s) found.',
				success: true,
				page: (page += 1),
				posts: transformPosts(posts.filter(c => !!c) as LeanDocument<PostDocument>[]),
			};
		else
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
