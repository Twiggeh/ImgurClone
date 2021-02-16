import { useTheme } from '@emotion/react';
import React from 'react';
import { useHistory } from 'react-router';
import Button from './Button';

interface IProfileBtn extends CustomCss {
	name: string;
}

const ProfileBtn: React.FC<IProfileBtn> = ({ name, scss }) => {
	const history = useHistory();
	const theme = useTheme();
	return (
		<>
			<Button
				scss={`
					${theme.mq.phone} {
						display: none;
					}
					${scss}
				`}
				onClick={e => {
					e.preventDefault();
					history.push('/profile');
				}}>
				Profile of {name}
			</Button>
			<Button
				scss={`
					display: none;
					${theme.mq.phone} {
						display: block;
					}
					${scss}
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
