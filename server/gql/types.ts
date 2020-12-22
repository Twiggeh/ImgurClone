import { gql } from 'apollo-server-express';
import { GetUserType } from './GetUserType.js';
import { AddUserType } from './AddUserType.js';
import { GetPostType } from './GetPostType.js';
import { AddPostType } from './AddPostType.js';
import { UploadFileType } from './UploadFileType.js';

const typeDefs = gql`
	scalar Upload
	type Query {
		_empty: String
	}
	type Mutation {
		_empty: String
	}
	${AddPostType}
	${GetPostType}
	${AddUserType}
	${GetUserType}
	${UploadFileType}
`;

export default typeDefs;
