import { gql } from '@apollo/client';

gql`
	query GetPost($postId: String, $userId: String, $userName: String) {
		getPost(postId: $postId, userId: $userId, userName: $userName) {
			success
			message
			posts {
				postId
				userId
				userName
				profilePicture
				addedDate
				comments {
					userId
					userName
					content
					profilePicture
					addedDate
				}
				cards {
					title
					description
					location
				}
			}
		}
	}
`;
