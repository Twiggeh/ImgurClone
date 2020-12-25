import { gql, useQuery } from '@apollo/client';

interface ICard {
	title?: string;
	description?: string;
	url: string;
}

export interface IPost {
	postId: string;
	userId?: string;
	userName?: string;
	profilePicture?: string;
	addedDate: number;
	comments?: Comment[];
	cards: ICard[];
}

type GetPostSuccess = {
	success: true;
	message: string;
	posts: IPost[];
};

type GetPostFailure = {
	success: false;
	message: string;
	posts: null;
};

type GetPostResult = GetPostFailure | GetPostSuccess;

export interface GetPostInput {
	userName?: string;
	userId?: string;
	postId?: string;
}

const GET_POST_QUERY = gql`
	query GetPost($postId: String, $userId: String, $userName: String) {
		getPost(postId: $postId, userId: $userId, userName: $userName) {
			success
			message
			posts {
				postId
				userId
				userName
				profilePicture
				addedDate
				comments {
					userId
					userName
					content
					profilePicture
					addedDate
				}
				cards {
					title
					description
					url
				}
			}
		}
	}
`;

const usePostsQuery = ({ postId, userId, userName }: GetPostInput) => {
	return useQuery<{ getPost: GetPostResult }, GetPostInput>(GET_POST_QUERY, {
		variables: { postId, userId, userName },
	});
};

export default usePostsQuery;
