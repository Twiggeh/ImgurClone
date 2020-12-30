import { gql } from 'apollo-server-express';

export const AddUserType = gql`
	type LoginResult {
		success: Boolean!
		message: String!
	}
	input AddUserGoogleInput {
		email: String!
		refreshToken: String!
		accessToken: String!
	}
	input AddUserLocalInput {
		email: String!
		password: String!
		verifyPassword: String!
	}
	input AddUserInput {
		profilePicture: String
		userName: String!
		local: AddUserLocalInput
		google: AddUserGoogleInput
	}
	extend type Mutation {
		addUser(AddUserInput: AddUserInput!): LoginResult
	}
`;
