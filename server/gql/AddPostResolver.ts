import Post from '../Models/Post.js';
import { Resolvers } from '../generated/gql.js';

export const AddPostResolver: Resolvers['Mutation']['addPost'] = async (
	_,
	{ userId, userName, profilePicture, cards }
) => {
	const newPost = new Post({
		userId,
		userName,
		profilePicture,
		cards,
	});
	try {
		// TODO : Saving the post should not save the path to the images, just their filename
		const savedPost = await newPost.save();
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
