import { gql } from "graphql-request";

export const STUDIO_TEACHERS_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }, limit: 1) {
      docs {
        name
        teachers {
          docs {
            id
            name
            description
            image {
              thumbnailURL
            }
          }
        }
      }
    }
  }
`