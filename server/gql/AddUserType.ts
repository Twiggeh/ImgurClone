import { gql } from 'apollo-server-express';

export const AddUserType = gql`
	type AddUserSuccess {
		message: String!
		id: String!
	}
	type AddUserFailure {
		message: String!
	}
	union AddUserResult = AddUserSuccess | AddUserFailure

	input AddUserGoogleInput {
		email: String!
		id: String!
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
		addUser(AddUserInput: AddUserInput!): AddUserResult!
	}
`;
