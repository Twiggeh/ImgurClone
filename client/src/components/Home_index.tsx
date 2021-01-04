const Home = () => {
	const { data } = useGetPostQuery();
	const posts = data?.getPost?.__typename === 'PostSuccess' ? data.getPost.posts : [];

	return (
		<Page>
			<TitleBar />
			<CenteredLayoutWrap>
				<Left></Left>
				<Center css='flex-basis: 150%;'>
					<StyledBigTitle> Recent Posts</StyledBigTitle>
					<PostList posts={posts} />
				</Center>
				<Right></Right>
			</CenteredLayoutWrap>
		</Page>
	);
};

export default Home;

import React from 'react';
import { useGetPostQuery } from '../generated/graphql';
import { Center } from './components/AuthComponents';
import {
	CenteredLayoutWrap,
	Left,
	Right,
} from './components/CenteredImgLayoutComponents';
import { Page } from './components/Page';
import PostList from './components/PostList';
import { StyledBigTitle } from './components/RandomComponents';
import TitleBar from './TitleBar';
