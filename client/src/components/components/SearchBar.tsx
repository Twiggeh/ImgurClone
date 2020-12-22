import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import { StyledInput } from './AuthComponents';

const SearchBar = () => {
	const [search, setSearch] = useState('');
	const theme = useTheme();
	return (
		<label htmlFor='search'>
			<StyledInput
				type='text'
				name='search'
				placeholder='Images, #tags, @users'
				value={search}
				css={`
					display: inline-block;
					margin: 0;
					background-color: ${theme.color.lightBackground};
				`}
				onChange={e => setSearch(e.target.value)}
			/>
		</label>
	);
};

export default SearchBar;
