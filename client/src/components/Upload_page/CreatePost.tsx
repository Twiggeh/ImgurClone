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
		<>
			<CreatePostTitle>Create Post</CreatePostTitle>
			<CreateWrapper>
				<Left />
				<Center>
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
						<Button css='width: 70%; box-sizing: border-box;'>
							<div>Submit !</div>
						</Button>
					</SideBar>
				</Right>
			</CreateWrapper>
		</>
	);
};

var SideBar = styled.div`
	position: sticky;
	top: 2vw;
	display: flex;
	justify-content: center;
	${props => props.theme.mq.phone} {
		position: fixed;
		top: 10vh;
		right: 2vw;
		background-color: ${props => props.theme.color.primary};
		align-items: center;
		width: 7em;
		height: 7em;
		border-radius: 50%;
		filter: drop-shadow(0 0 12px #171718);
		a {
			border-radius: 50%;
			height: 100%;
			width: 100%;
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

var Right = styled.div`
	align-self: stretch;
	flex: 0 1 33vw;
	${props => props.theme.mq.phone} {
		flex: 0 1 10vw;
	}
`;

var Left = styled.div`
	align-self: stretch;
	flex: 0 1 33vw;
	${props => props.theme.mq.phone} {
		flex: 0 1 10vw;
	}
`;

var Center = styled.div`
	flex-direction: column;
	justify-content: center;
	flex: 0 1 33vw;
	${props => props.theme.mq.phone} {
		flex: 0 1 100vw;
	}
`;

var CreateWrapper = styled.div`
	display: flex;
`;

var CreatePostTitle = styled.h2`
	width: fit-content;
	font-size: ${props => props.theme.fontSize.big};
	margin: 0.5em auto 0.5em auto;
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
