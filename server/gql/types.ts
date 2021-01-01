import { gql } from 'apollo-server-express';
import { GetUserType } from './GetUserType.js';
import { AddUserType } from './AddUserType.js';
import { GetPostType } from './GetPostType.js';
import { AddPostType } from './AddPostType.js';
import { UploadFileType } from './UploadFileType.js';
import { GetMeType } from './GetMeType.js';

const typeDefs = gql`
	scalar Upload
	scalar Date
	type Query {
		_empty: String
	}
	type Mutation {
		_empty: String
	}
	${UploadFileType}
	${GetPostType}
	${GetUserType}
	${GetMeType}
	${AddPostType}
	${AddUserType}
`;

export default typeDefs;
