import { gql } from "graphql-request";

export const STUDIO_WORKSHOP_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }, limit: 1) {
      docs {
        workshops(limit:0) {
          docs {
            workshopBlocks {
              ... on OfferingBlock {
              id
                title
              }
            }
          }
        }
        offerings(limit:0) {
          docs {
            offeringBlocks {
              ... on OfferingBlock {
              id
                title
              }
            }
          }
        }
      }
    }
  }
`