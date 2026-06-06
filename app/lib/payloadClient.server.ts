import { GraphQLClient } from 'graphql-request'

const endpoint = `${process.env.PAYLOAD_URL}/api/graphql`;

export const payloadClient = new GraphQLClient(endpoint)