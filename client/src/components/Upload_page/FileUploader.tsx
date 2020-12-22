import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import Button from '../components/Button';
import DragAndDrop, { PassedFile } from '../components/DragAndDrop';
import FileDisplay from './FileDisplay';
import { allSucceeded, UploadFilesResult } from './Upload_index';

const FileUploader: React.FC<IFileUploader> = ({
	passedFiles,
	setPassedFiles,
	uploadedFiles,
	maximum,
	uploadFile,
	setCreatePost,
}) => {
	const theme = useTheme();

	const DropZoneMessage = (() => {
		if (passedFiles?.length) {
			if (passedFiles.length >= 3)
				return 'To upload another image you will need to remove one';
			if (passedFiles.length <= 3) return 'Upload another image';
		}
		return 'Upload an image';
	})();

	const handleUploadFiles = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		if (!passedFiles) return;
		uploadFile({
			variables: { files: passedFiles.map(passedFile => passedFile.dataFile) },
		});
	};

	const handleCreatePost = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		setCreatePost(true);
	};
	return (
		<>
			<FileDisplay files={passedFiles} setFiles={setPassedFiles} />
			{passedFiles?.length ? (
				<Button
					customCss={`margin: 0 auto; font-size: ${theme.fontSize.medium}; width: 20vw; display: block;`}
					disabled={uploadedFiles && passedFiles?.length >= maximum}
					onClick={handleUploadFiles}>
					Upload !
				</Button>
			) : null}
			{uploadedFiles?.length && allSucceeded(uploadedFiles) ? (
				<Button onClick={handleCreatePost}>Create Post !</Button>
			) : null}
			<PositionDragArea>
				<DragAndDrop
					passedFiles={passedFiles}
					setPassedFiles={setPassedFiles}
					setErrorMessage={string => {
						console.log(string);
					}}
					formats={['image']}
					max={maximum}>
					<StyledDragArea>
						{DropZoneMessage}
						<StyledIcon role='img' aria-label='emoji'>
							&#128526;
						</StyledIcon>
					</StyledDragArea>
				</DragAndDrop>
			</PositionDragArea>
		</>
	);
};

var PositionDragArea = styled.div`
	width: 80%;
	padding: 4em 0 4em 0;
	margin: auto;
`;

var StyledDragArea = styled.div<{ css?: string }>`
	padding: 10%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column nowrap;
	color: ${({ theme }) => theme.color.lowContrastFont};
	border: 2px ${({ theme }) => theme.color.border} dashed;
	border-radius: 0.1vw;
	font-size: ${props => props.theme.fontSize.big};
	margin: auto;
`;

var StyledIcon = styled.span`
	font-size: ${props => props.theme.fontSize.big};
	margin-top: clamp(15px, 1vw, 40px);
`;

export default FileUploader;

// prettier-ignore
interface IFileUploader {
	passedFiles: PassedFile[] | undefined;
	setPassedFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>;
	uploadedFiles: UploadFilesResult[] | undefined;
	maximum: number;
	setCreatePost:  React.Dispatch<React.SetStateAction<boolean>>
	uploadFile: (
		options?:
			| MutationFunctionOptions<
					{
						uploadFiles: UploadFilesResult[];
					},
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					Record<string, any>
				>
			| undefined
	) => Promise<
		FetchResult<
			{
				uploadFiles: UploadFilesResult[];
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			Record<string, any>
		>
	>;
}
