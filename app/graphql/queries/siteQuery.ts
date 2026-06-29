import { gql } from "graphql-request";

export const SITE_QUERY = gql`
  query ($name: String!, $id: JSON!) {
    Sites(where: { name: { equals: $name } }) {
      docs {
        id
        name
        menuItems {
          id
          text
          link {
            type
          }
          links {
            text
            type
          }
        }
        footer {
          id
          title
          links {
            text
            url
          }
        }
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