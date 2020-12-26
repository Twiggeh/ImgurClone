import { GraphQLScalarType, Kind } from 'graphql';

export const Date = new GraphQLScalarType({
	name: 'Date',
	description: 'Unix Timestamp',
	serialize(value) {
		return value.getTime();
	},
	parseValue(value) {
		return value;
	},
	parseLiteral(ast) {
		switch (ast.kind) {
			case Kind.INT:
				return parseInt(ast.value, 10);
		}
		return null;
	},
});
