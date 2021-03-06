import { gql } from 'apollo-server-express';

export const AddPostType = gql`
	type AddPostSuccess {
		message: String!
		url: String!
	}
	type AddPostFailure {
		message: String!
	}
	union AddPostResult = AddPostFailure | AddPostSuccess
	input Card {
		title: String
		description: String
		location: String!
	}
	extend type Mutation {
		addPost(cards: [Card!]!): AddPostResult!
	}
`;
// TODO : Figure out how to return multiple things from one Mutation
