import Post from '../Models/Post.js';
import { Resolvers } from '../generated/gql.js';

export const AddPostResolver: Resolvers['Mutation']['addPost'] = async (
	_,
	{ cards },
	{ req, currentUser: { mongoId, profilePicture, userName } }
) => {
	const newPost = new Post({
		userId: mongoId,
		userName,
		profilePicture,
		cards,
	});
	try {
		// TODO : Saving the post should not save the path to the images, just their filename
		const savedPost = await newPost.save();

		if (req.session?.userId === undefined) {
			// create a new User
			req.session.noAccountPosts = req.session.noAccountPosts
				? [...req.session.noAccountPosts, savedPost.id]
				: [savedPost.id];
			//	await new Promise<string | void>((res, rej) =>
			// req.session.save(err => (err ? rej(err) : res))
			//);
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
