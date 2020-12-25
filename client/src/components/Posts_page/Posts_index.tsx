import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../components/Page';
import Posts from './Posts';

const Posts_Index: React.FC<IPost> = () => {
	const { id } = useParams<{ id: string }>();
	return (
		<Page>
			<Posts></Posts>
			<div>Masonry image{id ? id : 'Undefined'}</div>
		</Page>
	);
};

export default Posts_Index;

interface IPost {
	match?: {
		id?: string;
	};
}
