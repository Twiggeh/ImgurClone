const Posts_Index: React.FC = () => {
	const getQuery = useQueryParams();

	const userId = getQuery.get('userId');
	const userName = getQuery.get('userName');

	const { postId } = useParams<{ postId: string }>();
	// TODO : Add loading / error shower
	const { data } = useGetPostQuery({ variables: { postId, userId } });

	const posts = data?.getPost?.__typename === 'PostSuccess' ? data.getPost.posts : [];

	return (
		<Page>
			<TitleBar scss='margin-bottom : 2em;' />
			<CenteredLayoutWrap>
				<Left></Left>
				<Center>
					{userName ? <StyledBigTitle>All uploads by : {userName}</StyledBigTitle> : null}
					<PostList posts={posts} />
				</Center>
				<Right></Right>
			</CenteredLayoutWrap>
		</Page>
	);
};

export default Posts_Index;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../generated/graphql';
import {
	Center,
	CenteredLayoutWrap,
	Left,
	Right,
} from '../components/CenteredImgLayoutComponents';
import { Page } from '../components/Page';
import PostList from '../components/PostList';
import { StyledBigTitle } from '../components/RandomComponents';
import useQueryParams from '../hooks/useQuery';
import TitleBar from '../TitleBar';
