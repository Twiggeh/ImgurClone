import React from 'react';
import Home from './Home_index';
import Register from './Register_page/Register_index';
import Upload from './Upload_page/Upload_index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login_index';
import Profile from './Profile_index';
import Posts_Index from './Posts_page/Posts_index';

const Body = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<Home />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/posts' exact>
					<Posts_Index />
				</Route>
				<Route path='/posts/:postId'>
					<Posts_Index />
				</Route>
				<Route path='/upload'>
					<Upload />
				</Route>
				<Route path='/profile'>
					<Profile />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
				<Route>
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Body;
