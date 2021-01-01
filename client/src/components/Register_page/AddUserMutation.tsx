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

const AddUserMutation = () => {
	const addUser = useAddUserMutation();

	return addUser;
};

export default AddUserMutation;

import { useAddUserMutation } from '../../generated/graphql';
