import { gql } from "graphql-request";

export const STUDIO_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }) {
      docs {
        name
        banner {
            title
            media {
            url
            }
          }
        description
        schedule
        amenities {
          name
          image {
            url
          }
        }
        studioNav {
          text
        }
      }
    }
}`