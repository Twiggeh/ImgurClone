import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import {
	PostResult,
	useGetPostLazyQuery,
	useGetPostQuery,
} from '../../generated/graphql';
import { CrossSVG, SearchSVG } from '../../utils/assetImport';
import { MiniTitle, StyledInput } from './AuthComponents';
import { getUrlFromLocation } from '../../utils/utils';
import { useHistory } from 'react-router';

const ItemList: React.FC<{
	posts: (PostResult & { __typename: 'PostSuccess' })['posts'];
	closeItemList: () => void;
}> = ({ posts, closeItemList }) => {
	const history = useHistory();
	return (
		<>
			<ItemListWrap>
				{posts.map(({ profilePicture, userName, cards, postId, userId }) => {
					return (
						<Item key={postId}>
							<ImageWrapper
								onClick={() => {
									history.push(`/posts/${postId}`);
									closeItemList();
								}}>
								{cards.slice(0, 5).map(({ location, description, title }) => {
									return <SmallImage key={location} src={getUrlFromLocation(location)} />;
								})}
							</ImageWrapper>
							<NameImageWrap
								onClick={e => {
									e.preventDefault();
									history.push(`/posts?userId=${userId}`);
									closeItemList();
								}}>
								<MiniTitle>{userName}</MiniTitle>
								{profilePicture ? <MicroImg src={profilePicture} /> : null}
							</NameImageWrap>
						</Item>
					);
				})}
			</ItemListWrap>
		</>
	);
};
var ImageWrapper = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 1em;
`;

var Item = styled.div`
	display: flex;
	align-items: center;
	padding: 1em 0 1em 0;
	justify-content: space-between;
`;

var SmallImage = styled.img`
	cursor: pointer;
	width: clamp(40px, 35%, 65px);
	display: block;
`;

var NameImageWrap = styled.a`
	cursor: pointer;
	flex-shrink: 0;
	display: flex;
	gap: 2em;
	align-items: center;
	justify-content: flex-end;
`;

var MicroImg = styled.img`
	width: clamp(20px, 12%, 35px);
	display: block;
`;

var ItemListWrap = styled.div`
	top: 100%;
	left: 0;
	position: absolute;
	z-index: 50;
	backdrop-filter: blur(20px) brightness(60%) drop-shadow(100px 100px 20px black);
	border-radius: var(--borderRadius);
	align-items: center;
	padding: 2em;
	filter: drop-shadow(0px 0px 20px black);
`;

const Tags: React.FC<{
	prefix: '#' | '@';
	postfix?: string;
	maxLength?: number;
	ids: string[];
	deleteId: (i: number) => void;
}> = ({ postfix = '...', ids, maxLength = 5, prefix, deleteId }) => {
	return (
		<>
			{ids.map((id, i) => (
				<InputTags key={id + i}>
					{prefix}
					{id.substring(0, maxLength).padEnd(maxLength, ' ')}
					{postfix}
					<p
						onClick={e => {
							e.preventDefault();
							deleteId(i);
						}}>
						<CrossSVG />
					</p>
				</InputTags>
			))}
		</>
	);
};

const SearchBar = () => {
	const matchMap = { '#': 'postIds', postIds: '#', userIds: '@', '@': 'userIds' };

	const [searchState, _setSearch] = useState<{
		searchBar: string;
		userIds: string[];
		postIds: string[];
		matching: 'userIds' | 'postIds' | undefined;
		currentMatch: string;
		showDropDown: boolean;
	}>({
		searchBar: '',
		userIds: [],
		postIds: [],
		matching: undefined,
		currentMatch: '',
		showDropDown: false,
	});

	const {
		searchBar,
		userIds,
		postIds,
		matching,
		currentMatch,
		showDropDown,
	} = searchState;

	const setSearch = <T extends keyof typeof searchState>(
		key: T,
		value:
			| typeof searchState[T]
			| ((currentValue: typeof searchState[T]) => typeof searchState[T])
	) => {
		if (value instanceof Function) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			_setSearch(c => ({ ...c, ...{ [key]: value(c[String(key)]) } }));
		} else {
			_setSearch(c => ({ ...c, ...{ [key]: value } }));
		}
	};
	useEffect(() => {
		switch (searchBar[searchBar.length - 1]) {
			case '#':
				setSearch('matching', 'postIds');
				break;
			case '@':
				setSearch('matching', 'userIds');
				break;
			case ' ':
			case ',':
				if (matching && currentMatch !== '')
					setSearch(matching, c => [...c, currentMatch]);
				setSearch('currentMatch', '');
				setSearch('matching', undefined);
				setSearch('searchBar', '');
				break;

			default:
				if (matching)
					setSearch('currentMatch', c => {
						const result = (c += searchBar[searchBar.length - 1]
							? searchBar[searchBar.length - 1]
							: '');

						// Detect copy pasting / deleting
						if (result.length === searchBar.length - 1) return result;

						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						const startFrom = searchBar.lastIndexOf(matchMap[String(matching)]);
						return searchBar.slice(startFrom + 1, searchBar.length);
					});
		}
	}, [searchBar]);

	const theme = useTheme();

	const deleteHelper = (idKey: NonNullable<typeof searchState['matching']>) => {
		return (i: number) =>
			setSearch(idKey, c => {
				c.splice(i, 1);
				return c;
			});
	};
	// TODO allow to search for more than one query
	const [
		getPosts,
		{ data: postQueryResult, loading: postQueryLoading, error: postQueryErrors },
	] = useGetPostLazyQuery({
		variables: {
			postId: postIds[postIds.length - 1],
			userId: userIds[userIds.length - 1],
		},
	});

	const showSearch = Boolean(postIds.length + userIds.length);

	const posts =
		postQueryResult?.getPost?.__typename === 'PostSuccess'
			? postQueryResult.getPost.posts
			: [];

	return (
		<>
			<div>{JSON.stringify(postQueryErrors)}</div>
			<label htmlFor='search'>
				<InputWrapper>
					<Tags ids={userIds} prefix='@' deleteId={deleteHelper('userIds')} />
					<Tags ids={postIds} prefix='#' deleteId={deleteHelper('postIds')} />
					<StyledInput
						type='text'
						name='search'
						placeholder='Search Uploads: #postid, @user'
						value={searchBar}
						css={`
							display: inline-block;
							margin: 0;
							padding: 0;
							background-color: ${theme.color.lightBackground};
						`}
						onChange={e => setSearch('searchBar', e.target.value)}
					/>
					{showSearch ? (
						<SearchSVGWrapper
							onClick={() => {
								getPosts();
								setSearch('showDropDown', true);
							}}>
							<SearchSVG />
						</SearchSVGWrapper>
					) : null}
					{showDropDown ? (
						<ItemList
							posts={posts}
							closeItemList={() => setSearch('showDropDown', false)}
						/>
					) : null}
				</InputWrapper>
			</label>
		</>
	);
};

var SearchSVGWrapper = styled.p`
	width: 1.5em;
	cursor: pointer;
`;

var InputTags = styled.div`
	padding: 0.5em;
	border-radius: var(--borderRadius);
	background-color: ${props => props.theme.color.background};
	display: flex;
	gap: 0.4em;
	svg {
		cursor: pointer;
		width: 0.5em;
		stroke: white;
		stroke-width: 2;
	}
`;

var InputWrapper = styled.div`
	display: flex;
	gap: 1em;
	align-items: center;
	padding: 0 1.7em 0 0.9em;
	height: 3em;
	border-radius: var(--borderRadius);
	background-color: ${props => props.theme.color.lightBackground};
	margin-top: 1em;
	position: relative;
	box-sizing: border-box;
`;

export default SearchBar;
