import React from 'react';
import Comments from '../Comments/Comments';
import Content from '../Content/Content';
import Posts from '../Posts/Posts';
import SidebarVote from '../SidebarVote/SidebarVote';
import TitleBar from '../TitleBar/TitleBar';

const Posts_index = () => {
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

export default Posts_index;
