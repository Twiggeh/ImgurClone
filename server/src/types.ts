import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';

export type MyContext = {
	user: null | { userName: string };
};

export interface IResolver<Args, Return> {
	(
		parent: any,
		args: Args,
		context: MyContext,
		info: GraphQLResolveInfo & {
			mergeInfo: MergeInfo;
		}
	): Return | Promise<Return>;
}
