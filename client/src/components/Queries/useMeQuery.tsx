import { gql } from '@apollo/client';

gql`
	query GetMe {
		getMe {
			userName
			profilePicture
			mongoId
		}
	}
`;
