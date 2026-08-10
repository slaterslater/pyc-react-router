import { gql } from "graphql-request";

export const STUDIO_WORKSHOP_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }, limit: 1) {
      docs {
        workshops(limit:0) {
          docs {
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