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
	type PostResult {
		success: Boolean!
		message: String!
		posts: [Post!]
	}
	extend type Query {
		getPost(
			postId: String
			userName: String
			userId: String
			lastObjId: String
		): PostResult!
	}
`;
