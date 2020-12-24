import { gql } from 'apollo-server-express';

export const AddPostType = gql`
	type AddPostResult {
		success: Boolean!
		message: String!
		url: String
	}
	input Card {
		title: String
		description: String
		url: String!
	}
	extend type Mutation {
		addPost(
			userId: String
			userName: String
			profilePicture: String
			cards: [Card]!
		): AddPostResult
	}
`;
