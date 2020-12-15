import { gql } from 'apollo-server-express';

export const AddUserType = gql`
	type LoginResult {
		success: Boolean
		message: String
	}
	extend type Mutation {
		addUser(email: String!, password: String!, userName: String!): LoginResult
	}
`;
