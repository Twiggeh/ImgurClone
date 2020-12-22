import { GraphQLUpload } from 'graphql-upload';

const resolvers = {
	Upload: GraphQLUpload,
	Query: { getUser: GetUserResolver, getPost: GetPostResolver },
	Mutation: {
		addUser: AddUserResolver,
		addPost: AddPostResolver,
	},
};

export default resolvers;
