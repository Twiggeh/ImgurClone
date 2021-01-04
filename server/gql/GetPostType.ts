import { gql } from 'apollo-server-express';

export const GetPostType = gql`
	type Comment {
		userId: String!
		userName: String!
		content: String!
		profilePicture: String
		addedDate: Date!
	}
	type CardOut {
		title: String
		description: String
		location: String!
	}
	type Post {
		postId: String!
		userId: String!
		userName: String
		profilePicture: String
		addedDate: Date!
		comments: [Comment]
		cards: [CardOut!]!
	}
	type PostSuccess {
		message: String!
		page: Int!
		posts: [Post!]!
	}
	type PostFailure {
		message: String!
	}
	union PostResult = PostSuccess | PostFailure
	extend type Query {
		getPost(
			postId: String
			userName: String
			userId: String
			page: Int
			lastObjId: String
		): PostResult!
	}
`;
