import React, { useState } from 'react';
import { PassedFile } from '../components/DragAndDrop';
import { Page } from '../components/Page';
import TitleBar from '../TitleBar';
import { useMutation, gql } from '@apollo/client';
import FileUploader from './FileUploader';
import CreatePost from './CreatePost';
import useLocalStorage from '../hooks/useLocalStorage';

const maximum = 3;

const UPLOAD_FILES = gql`
	mutation UploadFiles($files: [Upload]!) {
		uploadFiles(files: $files) {
			success
			message
			url
		}
	}
`;

export const allSucceeded: (
	upFiles: Array<Record<string, unknown> & { success: boolean }>
) => boolean = upFiles => {
	return upFiles.reduce<boolean>((acc, upFile) => {
		return acc && upFile.success;
	}, true);
};

const Upload = () => {
	const [storedUploadedFiles, setStoredUploadedFiles] = useLocalStorage<
		UploadFilesResult[] | undefined
	>('__Uploaded_Files__', undefined);
	const [passedFiles, setPassedFiles] = useState<PassedFile[]>();
	const [uploadedFiles, setUploadedFiles] = useState<UploadFilesResult[] | undefined>(
		storedUploadedFiles
	);
	const [createPost, setCreatePost] = useState(false);

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

			setPassedFiles([...passedFiles]);
			setUploadedFiles(uploadedFiles);
			setStoredUploadedFiles(uploadedFiles);
		},
	});

	const showFileUploader =
		!(uploadedFiles && allSucceeded(uploadedFiles) && uploadedFiles.length >= maximum) &&
		(createPost === false || uploadedFiles === undefined);

	return (
		<Page>
			<TitleBar newPostVis={false} searchBar={false} />
			{showFileUploader ? (
				<FileUploader
					maximum={maximum}
					passedFiles={passedFiles}
					setPassedFiles={setPassedFiles}
					uploadFile={uploadFile}
					uploadedFiles={uploadedFiles}
					setCreatePost={setCreatePost}
				/>
			) : null}
			{!showFileUploader ? <CreatePost /> : null}
		</Page>
	);
};
export default Upload;

export type UploadFilesResult =
	| { success: true; message: string; url: string }
	| { success: false; message: string };
