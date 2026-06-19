import { gql } from "graphql-request";

export const STUDIO_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }) {
      docs {
        name
        banner {
            title
            media {
            alt
            sizes {
              thumbnail {
                url
              }
              card {
                url
              }
              desktop {
                url
              }
            }
            }
          }
        description
        site {
          id
          name
        }
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