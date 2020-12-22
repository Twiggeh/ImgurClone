/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { CrossSVG, UploadSVG } from '../../utils/assetImport';
import { PassedFile } from '../components/DragAndDrop';

interface IFileDisplay {
	files: PassedFile[] | undefined;
	setFiles: React.Dispatch<React.SetStateAction<PassedFile[] | undefined>>;
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

const HasBeenUploadedCard: React.FC<{ file: PassedFile }> = ({
	file: { dataFile, uuid, url },
}) => {
	const theme = useTheme();

	return (
		<Card key={uuid}>
			<TopRightButton
				css={`
					background-color: ${theme.color.success};
					cursor: normal;
				`}>
				<UploadSVG />
			</TopRightButton>
			<StyledImg
				src={url}
				css={`
					border: 2px ${theme.color.success} solid;
				`}
			/>
			<DataName>{dataFile.name}</DataName>
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

const FileDisplay: React.FC<IFileDisplay> = ({ files, setFiles }) => {
	if (!files || !setFiles) return null;
	return (
		<StyledFileDisplay>
			{files.map((file, i) => {
				switch (file.uploaded) {
					case undefined:
						return ToBeUploadedCard({ file, i, setFiles });
					case true:
						return HasBeenUploadedCard({ file });
					case false:
						return FailedTheUpload({ file, i, setFiles });
				}
			})}
		</StyledFileDisplay>
	);
};

var TopRightButton = styled.div<{ css?: string }>`
	position: absolute;
	border-radius: 50%;
	width: 2vw;
	height: 2vw;
	padding: 1.5vw;
	background: ${props => props.theme.color.danger};
	top: -2vw;
	right: -2vw;
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
	padding: 0 0 2em 0;
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
