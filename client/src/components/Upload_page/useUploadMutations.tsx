/* eslint-disable no-mixed-spaces-and-tabs */
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { PassedFile } from '../components/DragAndDrop';
import { UploadFilesResult, UploadPostResult } from './Upload_index';

const UPLOAD_FILES = gql`
	mutation UploadFiles($files: [Upload]!) {
		uploadFiles(files: $files) {
			success
			message
			url
		}
	}
`;

const UPLOAD_POST = gql`
	mutation addPost($cards: [Card]!) {
		addPost(userId: "hello", cards: $cards) {
			success
			url
			message
		}
	}
`;

const useUploadMutations = (
	setPassedFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>,
	setUploadedFiles: (
		input:
			| UploadFilesResult[]
			| ((input: UploadFilesResult[] | undefined) => UploadFilesResult[] | undefined)
			| undefined
	) => void,
	passedFiles: PassedFile[] | undefined
) => {
	const history = useHistory();

	const [uploadFile] = useMutation(UPLOAD_FILES, {
		onCompleted: (data: { uploadFiles: UploadFilesResult[] }) => {
			const uploadedFiles = data.uploadFiles;
			if (!passedFiles) return;
			for (let i = 0; i < uploadedFiles.length; i++) {
				const uploadedFile = uploadedFiles[Number(i)];
				if (uploadedFile.success) {
					passedFiles[Number(i)].uploaded = true;
					continue;
				}
				passedFiles[Number(i)].uploaded = false;
			}
			const filteredFiles = passedFiles.filter(file => !file.uploaded);

			setPassedFiles(filteredFiles);
			setUploadedFiles(c => (c ? [...c, ...uploadedFiles] : uploadedFiles));
		},
	});

	const [uploadPost] = useMutation(UPLOAD_POST, {
		onCompleted: (data: { addPost: UploadPostResult }) => {
			const result = data.addPost;
			if (!result.success) {
				// TODO : put into global messaging system -- try again
				console.log(result.message);
				return;
			}
			setUploadedFiles(undefined);
			history.push(result.url);
		},
	});

	return [uploadFile, uploadPost] as const;
};

export default useUploadMutations;
