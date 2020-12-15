import { gql } from 'apollo-server-express';

export const GetUserType = gql`
	type UserResult {
		success: Boolean!
		message: String!
		userName: String!
		email: String!
		profilePicture: String
	}
	extend type Query {
		getUser(email: String!, userName: String): UserResult
	}
`;
