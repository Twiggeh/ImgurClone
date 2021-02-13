import { Request } from 'express';
import { Session, SessionData } from 'express-session';
import { FileUpload } from 'graphql-upload';
import { Readable, ReadableOptions } from 'stream';

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
	noAccountPosts?: string[];
} & Session &
	Partial<SessionData>;

interface MyContext {
	currentUser:
		| {
				userName: string;
				profilePicture?: string;
				mongoId: string;
		  }
		| {
				userName?: undefined;
				profilePicture?: undefined;
				mongoId?: undefined;
		  };

	req: AuthReq;
}

type File = Promise<FileUpload>;
