/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import {
	UploadFileResult,
	AddPostMutationFn,
	UploadFileSuccess,
	UploadFileFailure,
	Card as _Card,
} from '../../generated/graphql';
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

const Card = <T extends { url: string; title?: string; text?: string }>(
	file: T,
	updateFile: ICreatePost['setUploadedFiles'],
	i: number
) => {
	const { url, text = '', title = '' } = file;
	const handleOnChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
		property: keyof T
	) => {
		updateFile(c => {
			if (!c) return undefined;
			const curFile = c[Number(i)];
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			curFile[String(property)] = e.target.value;
			c.splice(i, 1, curFile);
			return [...c];
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
		const cards = uploadedFiles.map(upFile => {
			if (upFile.__typename === 'UploadFileSuccess')
				return { title: upFile.title, description: upFile.text, url: upFile.url };
		}) as _Card[];

		uploadPost({
			variables: {
				// userId: 'TODO',
				// userName: 'TODO',
				// profilePicture: 'TODO',
				cards,
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
						if (file.__typename === 'UploadFileFailure') return;
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
			| UploadFileResult[]
			| undefined
			| ((input: UploadFileResult[] | undefined) => UploadFileResult[] | undefined)
	) => void;
	uploadedFiles: (
		| (UploadFileSuccess & { title?: string; text?: string })
		| UploadFileFailure
	)[];
	uploadPost: AddPostMutationFn;
}
