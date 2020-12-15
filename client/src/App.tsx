import { hot } from 'react-hot-loader/root';
import React from 'react';
import SidebarVote from './components/SidebarVote/SidebarVote';
import Content from './components/Content/Content';
import Comments from './components/Comments/Comments';
import Posts from './components/Posts/Posts';
import TitleBar from './components/TitleBar/TitleBar';

const App = () => {
	return (
		<>
			<TitleBar></TitleBar>
			<SidebarVote></SidebarVote>
			<Content></Content>
			<Comments></Comments>
			<Posts></Posts>
		</>
	);
};

export default hot(App);
