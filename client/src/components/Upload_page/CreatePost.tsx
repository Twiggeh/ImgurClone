import styled from '@emotion/styled';
import React from 'react';
import Button from '../components/Button';
import { UploadFilesResult } from './Upload_index';

interface ICreatePost {
	setStoredUploadedFiles: (value: UploadFilesResult[] | undefined) => void;
	uploadedFiles: UploadFilesResult[];
}

const Card = <T extends { url: string; title?: string; text?: string }>(file: T) => {
	const { url, text, title } = file;
	return (
		<StyledCard key={url}>
			<CardImg src={url} />
			<CardTitle value={title} placeholder='Add a title' maxLength={40} />
			<CardText value={text} placeholder='Add a description' maxLength={400} />
		</StyledCard>
	);
};

const CreatePost: React.FC<ICreatePost> = ({ setStoredUploadedFiles, uploadedFiles }) => {
	return (
		<CreateWrapper>
			<Left />
			<Center>
				<CreatePostTitle>Create Post</CreatePostTitle>
				{uploadedFiles.map(file => {
					if (!file.success) return;
					return Card(file);
				})}

				<Button
					onClick={e => {
						e.preventDefault();
						setStoredUploadedFiles(undefined);
					}}>
					Reset
				</Button>
			</Center>
			<Right>
				<SideBar>
					<Button css='width: 70%; box-sizing: border-box;'>Submit !</Button>
				</SideBar>
			</Right>
		</CreateWrapper>
	);
};

var SideBar = styled.div`
	position: sticky;
	padding-top: 30vh;
	top: 2vw;
`;

var Right = styled.div`
	flex-basis: 33%;
	align-self: stretch;
	flex-shrink: 0;
	flex-grow: 1;
`;

var Left = styled.div`
	flex-basis: 33%;
	align-self: stretch;
	flex-shrink: 0;
	flex-grow: 1;
`;

var Center = styled.div`
	flex-direction: column;
	justify-content: center;
	flex-basis: 33%;
	flex-shrink: 0;
	flex-grow: 0;
`;

var CreateWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

var CreatePostTitle = styled.h2`
	font-size: ${props => props.theme.fontSize.big};
	margin-bottom: 0.5em;
	font-weight: 400;
`;

var CardImg = styled.img`
	width: 100%;
`;

var CardTitle = styled.input`
	font-size: ${props => props.theme.fontSize.medium};
	background: transparent;
	border: 0;
	display: block;
	padding: 0.5vw 1vw;
	border-bottom: solid 1px transparent;
	&:focus {
		outline: none;
		border-bottom: solid 1px ${props => props.theme.color.fontColor};
	}
`;

var CardText = styled.textarea`
	font-size: ${props => props.theme.fontSize.small};
	background: ${props => props.theme.color.mediumBackground};
	border: 0;
	border-radius: var(--border-radius);
	resize: vertical;
	min-height: 120px;
	width: 100%;
	border-bottom: solid 1px transparent;
	padding: 1vw;
	border-bottom: solid 1px transparent;
	box-sizing: border-box;
	&:focus {
		outline: none;
		border-bottom: solid 1px ${props => props.theme.color.fontColor};
	}
`;

var StyledCard = styled.div`
	margin-bottom: 4em;
	> * {
		margin-bottom: 1em;
	}
`;

export default CreatePost;
