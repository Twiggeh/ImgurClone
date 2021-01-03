import { gql } from 'apollo-server-express';

export const SetUserType = gql`
	extend type Mutation {
		setUser(setUserInput: AddUserInput): GetUserResult
	}
`;
