const Home = () => {
	return (
		<Page>
			<TitleBar />
			<Posts />
		</Page>
	);
};

export default Home;

import React from 'react';
import { Page } from './components/Page';
import Posts from './Posts_page/Posts';
import TitleBar from './TitleBar';
