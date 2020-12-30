import { gql } from '@apollo/client';

gql`
	mutation AddUser($addUserInput: AddUserInput!) {
		addUser(AddUserInput: $addUserInput) {
			success
			message
		}
	}
`;

const AddUserMutation = () => {
	const addUser = useAddUserMutation();

	return addUser;
};

export default AddUserMutation;

import { useAddUserMutation } from '../../generated/graphql';
