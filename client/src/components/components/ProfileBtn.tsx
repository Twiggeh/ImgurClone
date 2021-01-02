import React from 'react';
import { useHistory } from 'react-router';
import Button from './Button';

interface IProfileBtn {
	name: string;
}

const ProfileBtn: React.FC<IProfileBtn> = ({ name }) => {
	const history = useHistory();
	return (
		<Button
			onClick={e => {
				e.preventDefault();
				history.push('/profile');
			}}>
			Profile of {name}
		</Button>
	);
};

export default ProfileBtn;
