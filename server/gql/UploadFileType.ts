import { gql } from 'apollo-server-express';

export const UploadFileType = gql`
	type UploadFileSuccess {
		message: String!
		url: String!
	}
	type UploadFileFailure {
		message: String!
	}
	union UploadFileResult = UploadFileSuccess | UploadFileFailure

	extend type Mutation {
		uploadFile(file: Upload!): UploadFileResult!
		uploadFiles(files: [Upload]!): [UploadFileResult!]!
	}
`;
