/* eslint-disable no-mixed-spaces-and-tabs */
import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import styled from '@emotion/styled';
import React from 'react';
import Button from '../components/Button';
import { SuccessFileUpload, UploadFilesResult, UploadPostResult } from './Upload_index';

const Card = <T extends { url: string; title?: string; text?: string }>(
	file: T,
	updateFile: ICreatePost['setUploadedFiles'],
	i: number
) => {
	const { url, text = '', title = '' } = file;
	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
		property: keyof SuccessFileUpload
	) => {
		updateFile(c => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const curFile = c![Number(i)] as SuccessFileUpload;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			curFile[String(property)] = e.target.value;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			c!.splice(i, 1, curFile);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return [...c!];
		});
	};
	return (
		<StyledCard key={url}>
			<CardImg src={url} />
			<CardTitle
				value={title}
				placeholder='Add a title'
				maxLength={40}
				onChange={e => handleOnChange(e, 'title')}
			/>
			<CardText
				value={text}
				placeholder='Add a description'
				maxLength={400}
				onChange={e => handleOnChange(e, 'text')}
			/>
		</StyledCard>
	);
};

const CreatePost: React.FC<ICreatePost> = ({
	setUploadedFiles,
	uploadedFiles,
	uploadPost,
}) => {
	const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		uploadPost({
			variables: {
				userId: 'TODO',
				userName: 'TODO',
				profilePicture: 'TODO',
				cards: uploadedFiles.map(upFile => {
					if (upFile.success)
						return { title: upFile.title, description: upFile.text, url: upFile.url };
				}),
			},
		});
	};
	return (
		<>
			<CreatePostTitle>Create Post</CreatePostTitle>
			<CreateWrapper>
				<Left />
				<Center>
					{uploadedFiles.map((file, i) => {
						if (!file.success) return;
						return Card(file, setUploadedFiles, i);
					})}
					<Button
						onClick={e => {
							e.preventDefault();
							setUploadedFiles(undefined);
						}}>
						Reset
					</Button>
				</Center>
				<Right>
					<SideBar>
						<Button css='width: 70%; box-sizing: border-box;' onClick={handleSubmit}>
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

interface ICreatePost {
	setUploadedFiles: (
		input:
			| UploadFilesResult[]
			| ((input: UploadFilesResult[] | undefined) => UploadFilesResult[] | undefined)
			| undefined
	) => void;
	uploadedFiles: UploadFilesResult[];
	uploadPost: (
		options?:
			| MutationFunctionOptions<
					{
						addPost: UploadPostResult;
					},
					Record<string, any>
			  >
			| undefined
	) => Promise<
		FetchResult<
			{
				addPost: UploadPostResult;
			},
			Record<string, any>,
			Record<string, any>
		>
	>;
}
