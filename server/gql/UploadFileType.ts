import { gql } from 'apollo-server-express';

export const UploadFileType = gql`
	extend type Mutation {
		uploadFile(file: Upload!): file!
		uploadFiles(files: [Upload]!): [file]!
	}
	type file {
		url: String
		message: String!
		success: Boolean!
	}
`;
