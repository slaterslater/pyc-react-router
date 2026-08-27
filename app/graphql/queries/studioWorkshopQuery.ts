import { gql } from "graphql-request";
import { OFFERING_FRAGMENT } from "../fragments/offeringFragment";

export const STUDIO_WORKSHOP_QUERY = gql`
  ${OFFERING_FRAGMENT}
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }, limit: 1) {
      docs {
        name
        amenities {
          name
          image {
            url
          }
        }
        workshops(limit:0) {
          docs {
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