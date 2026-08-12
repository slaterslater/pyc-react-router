import { gql } from "graphql-request";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";
import { OFFERING_FRAGMENT } from "../fragments/offeringFragment";

export const STUDIO_WORKSHOP_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${OFFERING_FRAGMENT}
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
              ...OfferingFragment
            }
          }
        }
        offerings(limit:0) {
          docs {
            offerings {
              ...OfferingFragment
            }
          }
        }
        address1
        address2
        city
        province
        state
        zip
        postalCode
      }
    }
  }
`