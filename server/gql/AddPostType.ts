import { gql } from 'apollo-server-express';

export const AddPostType = gql`
	type AddPostResult {
		success: Boolean
		message: String
	}
	extend type Mutation {
		addPost(
			title: String!
			userId: String!
			userName: String!
			description: String
			profilePicture: String
			picture: String
		): AddPostResult
	}
`;
