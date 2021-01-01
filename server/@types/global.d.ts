import { Request } from 'express';
import { Session, SessionData } from 'express-session';

declare namespace Express {
	//export interface Request extends Express.Request {
	//session : {
	//	grant?: {
	//		response: {
	//			access_token: string;
	//			refresh_token: string;
	//		};
	//	};
	//};
	//	}
}

interface AuthReq extends Request {
	session: SessionCtx;
}

type SessionCtx = {
	grant?: {
		response: {
			access_token: string;
			refresh_token: string;
		};
	};
	userId?: string;
} & Session &
	Partial<SessionData>;

interface MyContext {
	currentUser?: {
		userName: string;
		profilePicture?: string;
	};
}
