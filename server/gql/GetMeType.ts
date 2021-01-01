import { gql } from 'apollo-server-express';

export const GetMeType = gql`
	type Me {
		userName: String!
		profilePicture: String
	}
	extend type Query {
		getMe: Me
	}
`;
