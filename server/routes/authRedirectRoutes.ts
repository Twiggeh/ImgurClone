import { Router } from 'express';
import { AuthReq } from '../@types/global';
import fetch from 'node-fetch';
import { AddUserFn } from '../gql/AddUserResolver.js';
import { SERVER_URL } from '../src/app.js';

const router = Router();

interface GoogleResult {
	id: string;
	email: string;
	family_name: string;
	given_name: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
}

// Routes
router.get('/google*', async (req: AuthReq, res, next) => {
	const access_token: string | undefined = req.session.grant?.response.access_token;
	const refresh_token: string | undefined = req.session.grant?.response.refresh_token;

	// req.session.grant = undefined;

	if (access_token && refresh_token && !req.session.userId) {
		try {
			const request = await fetch('https://www.googleapis.com/userinfo/v2/me', {
				method: 'GET',
				headers: { Authorization: 'Bearer ' + access_token },
				compress: true,
			});

			if (!request.ok)
				throw { type: 'Google Auth', message: 'Could not get user data from google.' };

			const googleUserData: GoogleResult = await request.json();

			const localUserData = await AddUserFn({
				AddUserInput: {
					profilePicture: googleUserData.picture,
					userName: googleUserData.name,
					google: {
						email: googleUserData.email,
						id: googleUserData.id,
						refreshToken: refresh_token,
						accessToken: access_token,
					},
				},
			});

			if (localUserData.__typename === 'AddUserFailure')
				throw new Error(localUserData.message);

			req.session.userId = localUserData.id;
			// await new Promise((res, rej) => req.session.save(err => (err ? rej(err) : res())));
		} catch (error) {
			// TODO : Send error to the ui
			console.log(error);
			res.send(error);
		}
	}

	res.redirect(`/profile`);
	//next();
});

export default router;

/*  If you want to call the local gql server, thats how you would do it. You can also just call the resolver that you are targeting
		const gqlRequest = await fetch('http://localhost:5050/graphql', {
			method: 'POST',
			headers: {
				ContentType: 'application/json',
			},
			body: JSON.stringify({
				query: `
					mutation AddUser($addUserInput: AddUserInput) {
						addUser(AddUserInput: $addUserInput) {
							success
							message
						}
					}
				`,
				variables: {
					AddUserInput: {
						profilePicture: result.picture,
						userName: result.name,
						google: {
							email: result.email,
							refreshToken: refresh_token,
							accessToken: access_token,
						},
					},
				},
			}),
		});

*/
