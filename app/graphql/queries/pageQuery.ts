import { gql } from "graphql-request";

export const PAGE_QUERY = gql`
  query ($slug: String!) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        title
        site {
          name
        }
      }
    }
  }
`;