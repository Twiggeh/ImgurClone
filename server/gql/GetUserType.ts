import { gql } from 'apollo-server-express';

export const GetUserType = gql`
	type GetUserSuccess {
		message: String!
		userName: String!
		profilePicture: String
	}
	type GetUserFailure {
		message: String!
	}

	union GetUserResult = GetUserSuccess | GetUserFailure

	extend type Query {
		getUser(userName: String, mongoId: String): GetUserResult
	}
`;
