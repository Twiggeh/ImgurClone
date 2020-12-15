import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../src/types.js';
import Post, { IPost } from '../Models/Post.js';

interface IResolver<Args, Return> {
	(
		parent: any,
		args: Args,
		context: MyContext,
		info: GraphQLResolveInfo & {
			mergeInfo: MergeInfo;
		}
	): Return | Promise<Return>;
}

interface AddPostResolverInput extends IPost {}

interface AddPostResolverResult {
	success: boolean;
	message: string;
}

export const AddPostResolver: IResolver<
	AddPostResolverInput,
	AddPostResolverResult
> = async (parent, { title, userId, userName, description, profilePicture, picture }) => {
	const newPost = new Post({
		title,
		userId,
		userName,
		description,
		profilePicture,
		picture,
	});
	try {
		const savedPost = await newPost.save();
		return {
			message: `Post : ${savedPost.title} has been created Successfully`,
			success: true,
		};
	} catch (e) {
		console.error(e);
		return { message: `Could not create Post`, success: false };
	}
};
