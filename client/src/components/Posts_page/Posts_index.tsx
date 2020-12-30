import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../generated/graphql';
import { Page } from '../components/Page';
import TitleBar from '../TitleBar';
import Post from './Posts';

const Posts_Index: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	// TODO : Add loading / error shower
	const { data, loading, error } = useGetPostQuery({ variables: { postId } });

	const posts = data?.getPost?.posts ? data.getPost.posts : [];

	return (
		<Page>
			<TitleBar css='margin-bottom : 2em;' />
			<Post posts={posts}></Post>
		</Page>
	);
};

export default Posts_Index;
