import React from 'react';
import {
	CenteredLayoutWrap,
	Left,
	Center,
	StyledCard,
	CardImg,
	CardTitleInput,
	CardTextArea,
	Right,
} from '../components/CenteredImgLayoutComponents';
import { IPost } from './useGetPostsQuery';

const Post: React.FC<{ posts: IPost[] }> = ({ posts }) => {
	return (
		<CenteredLayoutWrap>
			<Left></Left>
			<Center>
				{posts.map(
					({ cards, comments, userName, userId, profilePicture, addedDate, postId }) => {
						return (
							<div key={postId}>
								{cards.map(({ url, description, title }, i) => {
									return (
										<StyledCard key={i}>
											<CardImg src={url} />
											{title ? <CardTitleInput as='div'>{title}</CardTitleInput> : null}
											{description ? (
												<CardTextArea as='div'>{description}</CardTextArea>
											) : null}
										</StyledCard>
									);
								})}
							</div>
						);
					}
				)}
			</Center>
			<Right></Right>
		</CenteredLayoutWrap>
	);
};
export default Post;
