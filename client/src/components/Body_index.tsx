/* eslint-disable no-mixed-spaces-and-tabs */
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

const [context, IdentityProvider] = createCtx<{
	loading: boolean;
	identity?: { userName: string; profilePicture?: string | null };
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
	// refreshIdentity: () => void;
}>();

export const IdentityContext = context;

const Body = () => {
	// const [identity, setIdentity] = useState(true);
	//const refreshIdentity = () => setIdentity(c => !c);
	// TODO : Make lazy
	const { data, loading, error, refetch } = useGetMeQuery();

	return (
		<IdentityProvider
			value={{ loading, error, identity: data?.getMe ? data.getMe : undefined, refetch }}>
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
