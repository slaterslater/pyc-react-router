import { gql } from "graphql-request";
import { LINK_FIELDS } from "../fields/linkFields";

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
              studio {
                slug
              }
            }
          }
          links {
            ${LINK_FIELDS}
          }
        }
        footer {
          id
          title
          links {
            ${LINK_FIELDS}
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
            studio {
              slug
            }
          }
          mboLink
        }
      }
    }
  }
`;
