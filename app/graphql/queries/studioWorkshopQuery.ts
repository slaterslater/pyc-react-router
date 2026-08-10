import { gql } from "graphql-request";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const STUDIO_WORKSHOP_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }, limit: 1) {
      docs {
        amenities {
          name
          image {
            url
          }
        }
        workshops(limit:0) {
          docs {
            banner {
              ...MediaFragment
            }
            workshops {
              id
              title
            }
          }
        }
        offerings(limit:0) {
          docs {
            offerings {
              id
              title
            }
          }
        }
      }
    }
  }
`