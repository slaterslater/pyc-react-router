import { gql } from "graphql-request";

export const STUDIO_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }) {
      docs {
        id
        name
        loginLink
        banner {
          title
          media {
            alt
            sizes {
              thumbnail {
                url
              }
              tablet {
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
          id
          type
          text
          url
          page {
            slug
          }
          mboLink
        }
        reviews {
          id
          text
          name
          description
        }
      }
    }
  }
`