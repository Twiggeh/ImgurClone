/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { GetPostQueryResult } from '../../generated/graphql';
import { getUrlFromLocation } from '../../utils/utils';
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

const Post: React.FC<{
	posts: Exclude<
		Exclude<GetPostQueryResult['data'], undefined | null>['getPost'],
		undefined | null
	>['posts'];
}> = ({ posts }) => {
	return (
		<CenteredLayoutWrap>
			<Left></Left>
			<Center>
				{posts === undefined || posts === null
					? null
					: posts.map(post => {
							if (!post) return null;
							const { cards, postId } = post;
							return (
								<div key={postId}>
									{cards.map((card, i) => {
										if (!card) return null;
										const { description, title, location } = card;
										const url = getUrlFromLocation(location);
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
					  })}
			</Center>
			<Right></Right>
		</CenteredLayoutWrap>
	);
};
export default Post;
