import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { UploadFileResult, UploadFilesMutationFn } from '../../generated/graphql';
import Button from '../components/Button';
import DragAndDrop, { PassedFile } from '../components/DragAndDrop';
import FileDisplay from './FileDisplay';
import { allSucceeded } from './Upload_index';

const FileUploader: React.FC<IFileUploader> = ({
	passedFiles,
	setPassedFiles,
	uploadedFiles,
	maximum,
	uploadFile,
	setCreatePost,
	totalFilesUploaded,
}) => {
	const theme = useTheme();

	const DropZoneMessage = (() => {
		if (totalFilesUploaded >= 3)
			return 'To upload another image you will need to remove one';
		if (totalFilesUploaded <= 3 && totalFilesUploaded !== 0)
			return 'Upload another image';
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

	const createUploadButtonCss = `margin: 0 auto; font-size: ${theme.fontSize.medium}; display: block;`;

	return (
		<>
			<FileDisplay
				files={passedFiles}
				setFiles={setPassedFiles}
				uploadedFiles={uploadedFiles}
			/>
			<ButtonContainer>
				{passedFiles?.length ? (
					<Button
						css={createUploadButtonCss}
						disabled={uploadedFiles && passedFiles?.length >= maximum}
						onClick={handleUploadFiles}>
						Upload !
					</Button>
				) : null}
				{uploadedFiles?.length && allSucceeded(uploadedFiles) ? (
					<Button css={createUploadButtonCss} onClick={handleCreatePost}>
						Create Post !
					</Button>
				) : null}
			</ButtonContainer>
			<PositionDragArea>
				<DragAndDrop
					disabled={totalFilesUploaded >= maximum}
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

var ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

var PositionDragArea = styled.div`
	padding: 4em 0 4em 0;
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
	uploadedFiles: UploadFileResult[] | undefined;
	maximum: number;
	totalFilesUploaded: number;
	setCreatePost:  React.Dispatch<React.SetStateAction<boolean>>
	uploadFile: UploadFilesMutationFn
}
