import styled from '@emotion/styled';
import {
	SetUserMutationVariables,
	useGetPostQuery,
	useSetUserMutation,
} from '../../generated/graphql';

const Profile = () => {
	const history = useHistory();
	const { identity, loading: identityLoading, refetch } = IdentityContext();

	// Stop from visiting profile when no user is present
	if (!identity && !identityLoading) {
		refetch();
		history.push('/');
	}

	const [formState, setFormState] = useState<{
		userName: string;
		profilePicture: string;
	}>({
		userName: identity?.userName ? identity.userName : '',
		profilePicture: identity?.profilePicture ? identity.profilePicture : '',
	});

	const [setUser, { loading, error }] = useSetUserMutation({
		onCompleted: ({ setUser }) => {
			if (setUser?.__typename !== 'GetUserSuccess') return;
			// TODO : Display data
			refetch();
		},
	});

	const setUserVars: SetUserMutationVariables = {
		setUserInput: {
			userName: formState.userName,
			profilePicture: formState.profilePicture,
		},
	};

	useEffect(() => {
		if (!identityLoading && identity)
			setFormState({
				userName: identity?.userName ? identity.userName : '',
				profilePicture: identity?.profilePicture ? identity.profilePicture : '',
			});
	}, [identityLoading, identity]);

	const updateForm = (
		e: React.ChangeEvent<HTMLInputElement>,
		key: keyof typeof formState
	) =>
		setFormState(c => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			c[String(key)] = e.target.value;
			return { ...c };
		});

	const anyChange =
		formState.profilePicture !== identity?.profilePicture ||
		(formState.profilePicture !== '' && identity.profilePicture === undefined) ||
		formState.userName !== identity?.userName;

	// Fetch the Users Posts

	const { data: postQueryData } = useGetPostQuery({
		variables: { userId: identity?.userId },
	});

	const UsersPosts =
		postQueryData?.getPost.__typename === 'PostSuccess'
			? postQueryData.getPost.posts
			: null;

	return (
		<Page>
			{JSON.stringify(error) /*TODO : Handle errors properly*/}
			<TitleBar profCol={anyChange ? 'transparent' : undefined} />
			<CenteredLayoutWrap scss='margin-top: 4rem;'>
				<Left></Left>
				<Center scss='flex-basis: 100%;'>
					<StyledBigTitle scss='margin-top: 0;'>Profile</StyledBigTitle>
					<StyledSmallTitle scss='text-align: left;'>Username</StyledSmallTitle>
					<StyledInput
						scss='min-width: unset;'
						value={formState.userName}
						onChange={e => updateForm(e, 'userName')}
					/>
					<FlexContainer>
						<TitleInputWrap>
							<StyledSmallTitle scss='display: inline-block; margin: 0;'>
								ProfilePicture
							</StyledSmallTitle>
							<StyledInput
								scss='min-width: unset;'
								value={formState.profilePicture}
								onChange={e => updateForm(e, 'profilePicture')}
							/>
						</TitleInputWrap>
						<StyledImg src={formState.profilePicture}></StyledImg>
					</FlexContainer>
					{UsersPosts ? (
						<>
							<StyledBigTitle scss='margin-top: 1.5em;'>Your Posts</StyledBigTitle>
							<PostList posts={UsersPosts} />
						</>
					) : null}
				</Center>
				<Right>
					{anyChange ? (
						<SideBar>
							<Button
								scss='width: 70%; box-sizing: border-box;'
								onClick={e => {
									e.preventDefault();
									setUser({ variables: setUserVars });
								}}>
								<div>{loading ? 'loading ...' : 'Update !'}</div>
							</Button>
						</SideBar>
					) : null}
				</Right>
			</CenteredLayoutWrap>
		</Page>
	);
};

export default Profile;

var TitleInputWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-around;
`;

var StyledImg = styled.img`
	margin-left: 3em;
	max-width: 15vw;
	max-height: 15vw;
`;

var FlexContainer = styled.div<CustomCss>`
	display: flex;
	align-items: stretch;
	margin: 3em 0 1em 0;
	${props => `${props.theme.mq.phone} {
		justify-content: space-between;
		input {
			width: 60vw;
		}
	}`}
`;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IdentityContext } from '../Body_index';
import { StyledInput } from '../components/AuthComponents';
import Button from '../components/Button';
import {
	Center,
	Right,
	Left,
	CenteredLayoutWrap,
	SideBar,
} from '../components/CenteredImgLayoutComponents';
import { Page } from '../components/Page';
import { StyledBigTitle, StyledSmallTitle } from '../components/RandomComponents';

import TitleBar from '../TitleBar';
import PostList from '../components/PostList';
