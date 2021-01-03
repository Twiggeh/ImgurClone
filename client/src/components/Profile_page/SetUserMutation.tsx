import { gql } from '@apollo/client';

gql`
	mutation SetUser($setUserInput: AddUserInput!) {
		setUser(setUserInput: $setUserInput) {
			... on GetUserSuccess {
				message
				userName
				profilePicture
			}
			... on GetUserFailure {
				message
			}
		}
	}
`;
