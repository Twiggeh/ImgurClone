/* eslint-disable no-mixed-spaces-and-tabs */

// AUTH PROVIDER
const [context, IdentityProvider] = createCtx<{
	loading: boolean;
	identity?: { userName: string; profilePicture?: string | null; userId: string };
	error?: ApolloError;
	refetch: (
		variables?:
			| Partial<
					Exact<{
						[key: string]: never;
					}>
			  >
			| undefined
	) => Promise<ApolloQueryResult<GetMeQuery>>;
}>();

export const IdentityContext = context;

const Body = () => {
	// TODO : Make lazy
	const { data, loading, error, refetch } = useGetMeQuery();

	const identity = data?.getMe
		? {
				userName: data.getMe.userName,
				profilePicture: data.getMe.profilePicture,
				userId: data.getMe.mongoId,
		  }
		: undefined;

	return (
		<IdentityProvider value={{ loading, error, identity, refetch }}>
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
		</IdentityProvider>
	);
};

export default Body;

import React from 'react';
import Home from './Home_index';
import Register from './Register_page/Register_index';
import Upload from './Upload_page/Upload_index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login_index';
import Profile from './Profile_page/Profile_index';
import Posts_Index from './Posts_page/Posts_index';
import {
	/* useGetMeLazyQuery */ Exact,
	GetMeQuery,
	useGetMeQuery,
} from '../generated/graphql';
import createCtx from './Providers/createStateCtx';
import type { ApolloError, ApolloQueryResult } from '@apollo/client';
