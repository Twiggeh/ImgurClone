/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Theme, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { CrossSVG, UploadSVG } from '../../utils/assetImport';
import { PassedFile } from '../components/DragAndDrop';
import { UploadFilesResult } from './Upload_index';

interface IFileDisplay {
	files: PassedFile[] | undefined;
	setFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>;
	uploadedFiles: UploadFilesResult[] | undefined;
}

const onClose: (
	e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	setFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>,
	i: number
) => void = (e, setFiles, i) => {
	e.preventDefault();
	setFiles(c => {
		c?.splice(i, 1);
		return [...c!];
	});
};

interface CardInterfaces {
	file: PassedFile;
	setFiles: IFileDisplay['setFiles'];
	i: number;
}

const ToBeUploadedCard: React.FC<CardInterfaces> = ({
	file: { dataFile, uuid, url },
	i,
	setFiles,
}) => {
	return (
		<Card key={uuid}>
			<TopRightButton onClick={e => onClose(e, setFiles, i)}>
				<CrossSVG />
			</TopRightButton>
			<StyledImg src={url} />
			<DataName>{dataFile.name}</DataName>
		</Card>
	);
};

const HasBeenUploadedCard = (file: UploadFilesResult, theme: Theme) => {
	if (!file.success) return null;
	return (
		<Card key={file.url}>
			<TopRightButton
				css={`
					background-color: ${theme.color.success};
					cursor: default;
				`}>
				<UploadSVG />
			</TopRightButton>
			<StyledImg
				src={file.url}
				css={`
					border: 2px ${theme.color.success} solid;
				`}
			/>
			<DataName>Uploaded :D</DataName>
		</Card>
	);
};

const FailedTheUpload: React.FC<CardInterfaces> = ({ file: { dataFile, uuid, url } }) => {
	return (
		<Card key={uuid}>
			<TopRightButton
				onClick={e => {
					e.preventDefault();
					// TODO : implement re-uploading of failed files
					console.log('Re Upload');
				}}>
				Try again
			</TopRightButton>
			<StyledImg src={url} />
			<DataName>{dataFile.name}</DataName>
		</Card>
	);
};

const FileDisplay: React.FC<IFileDisplay> = ({ files, setFiles, uploadedFiles }) => {
	const theme = useTheme();
	if ((!files || !setFiles) && !uploadedFiles) return null;
	return (
		<StyledFileDisplay>
			{[
				...(files
					? files.map((file, i) => {
							switch (file.uploaded) {
								case undefined:
									return ToBeUploadedCard({ file, i, setFiles });
								case false:
									return FailedTheUpload({ file, i, setFiles });
								case true:
									return null;
							}
					  })
					: []),
				...(uploadedFiles
					? uploadedFiles.map(file => HasBeenUploadedCard(file, theme))
					: []),
			]}
		</StyledFileDisplay>
	);
};

var TopRightButton = styled.div<{ css?: string }>`
	position: absolute;
	z-index: 10;
	border-radius: 50%;
	width: clamp(15px, 2vw, 40px);
	height: clamp(15px, 2vw, 40px);
	padding: 1em;
	background: ${props => props.theme.color.danger};
	top: clamp(-15px, -2vw, -40px);
	right: clamp(-15px, -2vw, -40px);
	cursor: pointer;
	filter: drop-shadow(0 0 1vw #000) drop-shadow(0 0 2vw rgba(0, 0, 0, 0.5));
	path {
		stroke: ${props => props.theme.color.fontColor};
		stroke-width: 0.05vw;
	}
	${props => props.css}
`;

var DataName = styled.div`
	overflow-x: hidden;
	overflow-y: hidden;
	text-align: center;
	padding-top: 1em;
	line-height: 1.4em;
`;

var Card = styled.div`
	width: 20vw;
	position: relative;
`;

var StyledFileDisplay = styled.div`
	padding: 2em;
	display: flex;
	justify-content: center;
	margin: auto;
	gap: 2em;
`;

var StyledImg = styled.img<{ css?: string }>`
	width: 100%;
	box-sizing: border-box;
	${props => props.css}
`;

export default FileDisplay;
