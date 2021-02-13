/* eslint-disable no-mixed-spaces-and-tabs */
import { gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
	UploadFileResult,
	useAddPostMutation,
	useUploadFilesMutation,
} from '../../generated/graphql';
import { PassedFile } from '../components/DragAndDrop';

gql`
	mutation UploadFiles($files: [Upload]!) {
		uploadFiles(files: $files) {
			... on UploadFileSuccess {
				message
				url
			}
			... on UploadFileFailure {
				message
			}
		}
	}
`;

gql`
	mutation addPost($cards: [Card!]!) {
		addPost(cards: $cards) {
			... on AddPostSuccess {
				message
				url
			}
			... on AddPostFailure {
				message
			}
		}
	}
`;

const useUploadMutations = (
	setPassedFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>,
	setUploadedFiles: (
		input:
			| UploadFileResult[]
			| ((input: UploadFileResult[] | undefined) => UploadFileResult[] | undefined)
			| undefined
	) => void,
	passedFiles: PassedFile[] | undefined
) => {
	const history = useHistory();

	const [uploadFile] = useUploadFilesMutation({
		onCompleted: data => {
			const uploadedFiles = data.uploadFiles;
			if (!uploadedFiles) return;
			if (!passedFiles) return;
			for (let i = 0; i < uploadedFiles.length; i++) {
				const uploadedFile = uploadedFiles[Number(i)];
				if (uploadedFile?.__typename === 'UploadFileSuccess') {
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

	const [uploadPost] = useAddPostMutation({
		onCompleted: data => {
			const result = data.addPost;
			if (result.__typename === 'AddPostFailure') {
				// TODO : put into global messaging system -- try again
				console.log(result.message);
				return;
			}
			setUploadedFiles(undefined);
			if (result.url) history.push(result.url);
		},
	});

	return [uploadFile, uploadPost] as const;
};

export default useUploadMutations;
