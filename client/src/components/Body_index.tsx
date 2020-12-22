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
				<Route path='/posts'></Route>
				<Route path='/upload'>
					<Upload />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Body;
import React from 'react';
import Home from './Home_index';
import Register from './Register_index';
import Upload from './Upload_page/Upload_index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login_index';
