import { AddUserResolver } from './AddUserResolver.js';
import { GetUserResolver } from './GetUserResolver.js';
import { GetPostResolver } from './GetPostResolver.js';
import { AddPostResolver } from './AddPostResolver.js';
import { UploadFileResolver, UploadFilesResolver } from './UploadFileResolver.js';
import { GraphQLUpload } from 'graphql-upload';
import { Date } from './JSLongResolver.js';

const resolvers = {
	Upload: GraphQLUpload,
	Date: Date,
	Query: { getUser: GetUserResolver, getPost: GetPostResolver },
	Mutation: {
		addUser: AddUserResolver,
		addPost: AddPostResolver,
		uploadFile: UploadFileResolver,
		uploadFiles: UploadFilesResolver,
	},
};

export default resolvers;
