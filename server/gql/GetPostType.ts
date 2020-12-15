import { gql } from 'apollo-server-express';

export const GetPostType = gql`
	type Comment {
		userId: String!
		userName: String!
		content: String!
		profilePicture: String
		addedDate: Int
	}
	type PostResult {
		success: Boolean!
		message: String!
		title: String!
		userId: String!
		userName: String!
		email: String!
		profilePicture: String
	}
	extend type Query {
		getPost(postId: String, userName: String): PostResult
	}
`;
