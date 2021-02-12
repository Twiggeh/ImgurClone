import { AddUserResolver } from './AddUserResolver.js';
import { SetUserResolver } from './SetUserResolver.js';
import { GetUserResolver } from './GetUserResolver.js';
import { GetPostResolver } from './GetPostResolver.js';
import { AddPostResolver } from './AddPostResolver.js';
import { UploadFileResolver, UploadFilesResolver } from './UploadFileResolver.js';
import { GetMeResolver } from './GetMeResolver.js';
import { GraphQLUpload } from 'graphql-upload';
import { Date } from './DateResolver.js';
import { Resolvers } from '../generated/gql';

const resolvers: Resolvers = {
	Upload: GraphQLUpload,
	Date: Date,
	Query: { getUser: GetUserResolver, getPost: GetPostResolver, getMe: GetMeResolver },
	Mutation: {
		addUser: AddUserResolver,
		setUser: SetUserResolver,
		addPost: AddPostResolver,
		uploadFile: UploadFileResolver,
		uploadFiles: UploadFilesResolver,
	},
	UploadFileResult: {
		__resolveType(obj) {
			console.log('uploadFile', obj);
			return obj.__typename;
		},
	},
	AddPostResult: {
		__resolveType(obj) {
			console.log('addPost', obj);
			return obj.__typename;
		},
	},
	GetUserResult: {
		__resolveType(obj) {
			console.log('resolving user', obj);
			return obj.__typename;
		},
	},
	AddUserResult: {
		__resolveType(obj) {
			console.log('adding user', obj);
			return obj.__typename;
		},
	},
	PostResult: {
		__resolveType(obj) {
			console.log('resolving a post', obj);
			return obj.__typename;
		},
	},
};

export default resolvers;
