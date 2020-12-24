import { gql } from 'apollo-server-express';

export const GetPostType = gql`
	type Comment {
		userId: String!
		userName: String!
		content: String!
		profilePicture: String
		addedDate: Int
	}
	type CardOut {
		title: String
		description: String
		url: String!
	}
	type Post {
		userId: String
		userName: String
		profilePicture: String
		addedDate: Int!
		comments: [Comment]
		cards: [CardOut]
	}
	type PostResult {
		success: Boolean!
		message: String!
		posts: [Post]
	}
	extend type Query {
		getPost(postId: String, userName: String, userId: String): PostResult
	}
`;
