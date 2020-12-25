/* eslint-disable no-mixed-spaces-and-tabs */
import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import React from 'react';
import Button from '../components/Button';
import {
	CardImg,
	CardTextArea,
	CardTitleInput,
	Center,
	CreatePostTitle,
	Left,
	Right,
	SideBar,
	StyledCard,
	CenteredLayoutWrap,
} from '../components/CenteredImgLayoutComponents';
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
			<CardTitleInput
				value={title}
				placeholder='Add a title'
				maxLength={40}
				onChange={e => handleOnChange(e, 'title')}
			/>
			<CardTextArea
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
			<CenteredLayoutWrap>
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
			</CenteredLayoutWrap>
		</>
	);
};

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
