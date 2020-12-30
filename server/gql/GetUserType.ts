import { gql } from 'apollo-server-express';

export const GetUserType = gql`
	type GetUserResultSuccess {
		message: String!
		userName: String!
		profilePicture: String
	}
	type GetUserResultFailure {
		message: String!
	}

	union UserResult = GetUserResultSuccess | GetUserResultFailure

	extend type Query {
		getUser(email: String!, userName: String): UserResult
	}
`;
