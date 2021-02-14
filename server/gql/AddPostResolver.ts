import Post, { IPost } from '../Models/Post.js';
import type { MutationResolvers } from '../generated/gql.js';
import { ICard } from 'Models/Card.js';
import { deNull } from '../utils/utils.js';

export const AddPostResolver: MutationResolvers['addPost'] = async (
	_,
	{ cards },
	{ req, currentUser }
) => {
	const processedCards: ICard[] = cards.map(c => {
		return {
			location: c.location,
			description: deNull(c.description),
			title: deNull(c.title),
		};
	});

	const postData: IPost = {
		userId: currentUser.mongoId ? currentUser.mongoId : req.sessionID,
		userName: currentUser.userName,
		profilePicture: currentUser.profilePicture,
		cards: processedCards,
		addedDate: Date.now(),
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
