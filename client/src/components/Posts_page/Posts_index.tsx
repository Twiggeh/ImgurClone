const Posts_Index: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	// TODO : Add loading / error shower
	const { data } = useGetPostQuery({ variables: { postId } });

	const posts = data?.getPost?.__typename === 'PostSuccess' ? data.getPost.posts : [];

	return (
		<Page>
			<TitleBar css='margin-bottom : 2em;' />
			<CenteredLayoutWrap>
				<Left></Left>
				<Center>
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
import TitleBar from '../TitleBar';
