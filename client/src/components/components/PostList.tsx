import styled from '@emotion/styled';
import React from 'react';
import { useHistory } from 'react-router';
import { PostResult } from '../../generated/graphql';
import { getUrlFromLocation } from '../../utils/utils';
import { MiniTitle } from './AuthComponents';
import {
	CardImg,
	CardTextArea,
	CardTitleInput,
	StyledCard,
} from './CenteredImgLayoutComponents';

const PostList: React.FC<{
	posts: (PostResult & { __typename: 'PostSuccess' })['posts'];
}> = ({ posts }) => {
	const history = useHistory();
	return (
		<>
			{posts.map(post => {
				const { cards, postId, userName, profilePicture, userId } = post;
				return (
					<StyledPost key={postId}>
						{cards.map((card, i) => {
							const { description, title, location } = card;
							const url = getUrlFromLocation(location);
							return (
								<StyledCard key={i}>
									<ImageWrapper>
										<CardImg src={url} />
										<CardFooter
											onClick={e => {
												e.preventDefault();
												history.push(`/posts/${userId}`);
											}}>
											<MiniTitle>uploaded by {userName}</MiniTitle>
											<MiniImg src={profilePicture ? profilePicture : ''} />
										</CardFooter>
									</ImageWrapper>
									{title ? <CardTitleInput as='div'>{title}</CardTitleInput> : null}
									{description ? (
										<CardTextArea as='div'>{description}</CardTextArea>
									) : null}
								</StyledCard>
							);
						})}
					</StyledPost>
				);
			})}
		</>
	);
};

var StyledPost = styled.div`
	width: 100%;
`;

var ImageWrapper = styled.div`
	position: relative;
`;

var MiniImg = styled.img`
	width: 10%;
`;

var CardFooter = styled.a`
	display: flex;
	cursor: pointer;
	justify-content: flex-end;
	align-items: center;
	position: absolute;
	margin: 0;
	bottom: 0;
	right: 0;
	backdrop-filter: brightness(60%) blur(13px);
	width: 100%;
	gap: 1em;
`;

export default PostList;
