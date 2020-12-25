import { IResolver } from '../src/types.js';
import Post, { IPost } from '../Models/Post.js';
import { SERVER_URL } from '../src/app.js';

interface AddPostResolverInput extends IPost {}

export const AddPostResolver: IResolver<
	AddPostResolverInput,
	AddPostResolverResult
> = async (parent, { userId, userName, profilePicture, cards }) => {
	const newPost = new Post({
		userId,
		userName,
		profilePicture,
		cards,
	});
	try {
		const savedPost = await newPost.save();
		return {
			message: `Post : has been created Successfully`,
			success: true,
			url: `/posts/${savedPost.id}`,
		};
	} catch (e) {
		console.error(e);
		return { message: `Could not create Post`, success: false };
	}
};

type AddPostResolverResult = AddPostFail | AddPostSuccess;

type AddPostSuccess = {
	success: boolean;
	message: string;
	url: string;
};

type AddPostFail = {
	success: false;
	message: string;
};
