import { gql } from '@apollo/client';

gql`
	mutation AddUser($addUserInput: AddUserInput!) {
		addUser(AddUserInput: $addUserInput) {
			... on AddUserFailure {
				message
			}
			... on AddUserSuccess {
				message
				id
			}
		}
	}
`;
