import React from 'react';
import { useHistory } from 'react-router';
import { IdentityContext } from '../Body_index';
import Button from './Button';

const LogOutBtn: React.FC<CustomCss> = ({ scss }) => {
	const history = useHistory();
	const { refetch } = IdentityContext();

	const logout = async () => {
		try {
			await fetch(`${BACKEND_SERVER_URL}/logout`, {
				credentials: 'include',
				mode: 'no-cors',
				method: 'GET',
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Button
			scss={scss}
			bgColor='transparent'
			onClick={async e => {
				e.preventDefault();
				await logout();
				await refetch();
				history.push('/');
			}}>
			Log Out
		</Button>
	);
};

export default LogOutBtn;
