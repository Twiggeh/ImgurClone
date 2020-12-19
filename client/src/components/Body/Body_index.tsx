import React from 'react';
import Home_index from '../Home/Home_index';
import Register from '../Register_Page/Register_index';

const Body = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact>
					<Home_index />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/posts'></Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Body;
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login_page/Login_index';
