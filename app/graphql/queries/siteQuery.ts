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
          type
          link {
            type
            url
            mboLink
            page {
              slug
              title
            }
          }
          links {
            id
            text
            type
            url
            mboLink
            page {
              slug
              title
            }
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
    Studios(
      where: { site: { equals: $id } }
      limit: 0
      sort: "name"
    ) {
      docs {
        id
        name
        slug
      }
    }
    Announcement {
      items {
        id
        sites {
          name
        }
        text
        hasLink
        link {
          type
          url
          page {
            slug
          }
          mboLink
        }
      }
    }
  }
`;
