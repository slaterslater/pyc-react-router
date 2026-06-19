import { gql } from "graphql-request";

export const SITE_QUERY = gql`
  query ($name: String!, $id: JSON!) {
    Sites(where: { name: { equals: $name } }) {
      docs {
        id
        name
      }
    }
    Studios(where: { site: { equals: $id } }) {
      docs {
        id
        name
        slug
      }
    }
  }
`;