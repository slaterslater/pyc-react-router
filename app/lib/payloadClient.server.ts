import { GraphQLClient } from 'graphql-request'

const endpoint = `${process.env.PAYLOAD_URL}/api/graphql`;

export const payload = new GraphQLClient(endpoint)