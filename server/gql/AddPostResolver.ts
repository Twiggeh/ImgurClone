import Post, { IPost } from '../Models/Post.js';
import type { MakeOptional, Resolvers } from '../generated/gql.js';
import type { Optional } from 'src/types.js';

export const AddPostResolver: Resolvers['Mutation']['addPost'] = async (
	_,
	{ cards },
	{ req, currentUser }
) => {
	const postData: Optional<IPost> = {
		userId: currentUser.mongoId ? currentUser.mongoId : req.sessionID,
		userName: currentUser.userName,
		profilePicture: currentUser.profilePicture,
		cards,
	};

	try {
		const newPost = new Post(postData);

		const savedPost = await newPost.save();

		if (!currentUser.mongoId) {
			req.session.noAccountPosts = req.session.noAccountPosts
				? [...req.session.noAccountPosts, savedPost.id]
				: [savedPost.id];

			req.session.save();
		}

		return {
			__typename: 'AddPostSuccess',
			message: `Post : has been created Successfully`,
			url: `/posts/${savedPost.id}`,
		};
	} catch (e) {
		console.error(e);
		return { message: `Could not create Post`, __typename: 'AddPostFailure' };
	}
};
