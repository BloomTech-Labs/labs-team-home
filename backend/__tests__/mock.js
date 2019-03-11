// this is going to be a long work in progress, but here is a generic animal resolver than will work as our mock
// currently, not sure how to actually fire off the tests - much more reading and research required

import {
	makeExecutableSchema,
	addMockFunctionsToSchema,
	mockServer
} from 'graphql-tools';

const testCaseA = {
	id: 'Test case A',
	query: `
    query {
      animals {
         origin
      }
    }
  `,
	variables: {},
	context: {},
	expected: { data: { animals: [{ kind: 'Dog' }] } }
};

describe('Schema', () => {
	// Array of case types
	const cases = [testCaseA];

	const mockSchema = makeExecutableSchema({ typeDefs });

	// Here we specify the return payloads of mocked types
	addMockFunctionsToSchema({
		schema: mockSchema,
		mocks: {
			Boolean: () => false,
			ID: () => '1',
			Int: () => 1,
			Float: () => 12.34,
			String: () => 'Dog'
		}
	});

	test('has valid type definitions', async () => {
		expect(async () => {
			const MockServer = mockServer(typeDefs);

			await MockServer.query(`{ __schema { types { name } } }`);
		}).not.toThrow();
	});

	cases.forEach(obj => {
		const { id, query, variables, context: ctx, expected } = obj;

		test(`query: ${id}`, async () => {
			return await expect(
				graphql(mockSchema, query, null, { ctx }, variables)
			).resolves.toEqual(expected);
		});
	});
});
