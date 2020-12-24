import React, { useState } from 'react';
import { PassedFile } from '../components/DragAndDrop';
import { Page } from '../components/Page';
import TitleBar from '../TitleBar';
import FileUploader from './FileUploader';
import CreatePost from './CreatePost';
import useLocalStorage from '../hooks/useLocalStorage';
import styled from '@emotion/styled';
import { bindLocalStore } from '../../utils/uploadHelper';
import useUploadMutations from './useUploadMutations';

const maximum = 3;

export const allSucceeded: (
	upFiles: Array<Record<string, unknown> & { success: boolean }>
) => boolean = upFiles => {
	return upFiles.reduce<boolean>((acc, upFile) => {
		return acc && upFile.success;
	}, true);
};

const amountSucceeded: (
	upFiles: Array<Record<string, unknown> & { success: boolean }>
) => number = upFiles => {
	return upFiles.reduce<number>((acc, upFile) => (upFile.success ? acc + 1 : acc), 0);
};

const Upload = () => {
	// Create LocalStorage Space / retrieve stored values
	const [storedUploadedFiles, setStoredUploadedFiles] = useLocalStorage<
		UploadFilesResult[] | undefined
	>('__Uploaded_Files__', undefined);
	const [storedCreatePost, setStoredCreatedPost] = useLocalStorage<boolean>(
		'__Creating_Post__',
		false
	);

	// Control bad state
	if (storedUploadedFiles === undefined && storedCreatePost === true) {
		setStoredCreatedPost(false);
	}

	// Create React State with LocalStorage Items
	const [passedFiles, setPassedFiles] = useState<PassedFile[] | undefined>(undefined);
	const [uploadedFiles, _setUploadedFiles] = useState<UploadFilesResult[] | undefined>(
		storedUploadedFiles
	);
	const [createPost, _setCreatePost] = useState(storedCreatePost);

	// Bind React State to LocalStorage
	const setUploadedFiles = bindLocalStore<UploadFilesResult[] | undefined>(
		_setUploadedFiles,
		setStoredUploadedFiles
	);
	const setCreatePost = bindLocalStore(_setCreatePost, setStoredCreatedPost);

	const [uploadFile, uploadPost] = useUploadMutations(
		setPassedFiles,
		setUploadedFiles,
		passedFiles
	);

	let showFileUploader = false;

	const pasFileL = passedFiles?.length !== undefined ? passedFiles.length : 0;
	const uplFileL = uploadedFiles?.length !== undefined ? uploadedFiles.length : 0;

	if (pasFileL + uplFileL < length && createPost === false) showFileUploader = true;

	if (createPost === false || (uploadedFiles === undefined && passedFiles === undefined))
		showFileUploader = true;

	return (
		<Page>
			<TitleBar newPostVis={false} searchBar={false} />
			<Container>
				{showFileUploader ? (
					<FileUploader
						maximum={maximum}
						passedFiles={passedFiles}
						setPassedFiles={setPassedFiles}
						uploadFile={uploadFile}
						uploadedFiles={uploadedFiles}
						setCreatePost={setCreatePost}
						totalFilesUploaded={pasFileL + uplFileL}
					/>
				) : null}
			</Container>
			{uploadedFiles && amountSucceeded(uploadedFiles) > 0 && createPost ? (
				<CreatePost
					setUploadedFiles={setUploadedFiles}
					uploadedFiles={uploadedFiles}
					uploadPost={uploadPost}
				/>
			) : null}
		</Page>
	);
};

var Container = styled.div`
	max-width: 900px;
	width: 80%;
	margin: auto;
`;

export default Upload;

export type SuccessFileUpload = {
	success: true;
	message: string;
	url: string;
	title?: string;
	text?: string;
};

export type FailedFileUpload = {
	success: false;
	message: string;
};

export type UploadFilesResult = SuccessFileUpload | FailedFileUpload;

export type SuccessPostUpload = {
	success: true;
	message: string;
	url: string;
};

export type FailedPostResult = FailedFileUpload;

export type UploadPostResult = SuccessPostUpload | FailedPostResult;
