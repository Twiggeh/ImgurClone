import { useTheme } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router';
import Button from './Button';

interface IProfileBtn {
	name: string;
	css?: string;
}

const ProfileBtn: React.FC<IProfileBtn> = ({ name, css }) => {
	const history = useHistory();
	const theme = useTheme();
	return (
		<>
			<Button
				css={`
					${theme.mq.phone} {
						display: none;
					}
					${css}
				`}
				onClick={e => {
					e.preventDefault();
					history.push('/profile');
				}}>
				Profile of {name}
			</Button>
			<Button
				css={`
					display: none;
					${theme.mq.phone} {
						display: block;
					}
					${css}
				`}
				onClick={e => {
					e.preventDefault();
					history.push('/profile');
				}}>
				P
			</Button>
		</>
	);
};

export default ProfileBtn;
