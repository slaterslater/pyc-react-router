import { gql } from "graphql-request";
import { OFFERING_FRAGMENT } from "../fragments/offeringFragment";

export const STUDIO_QUERY = gql`
  ${OFFERING_FRAGMENT}
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }) {
      docs {
        id
        name
        slug
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
        workshops(limit: 0) {
          docs {
            id
          }
        }
        offerings(limit: 0) {
          docs {
            introOffer
            offerings {
              ...OfferingFragment
            }
          }
        }
        reviews {
          id
          text
          name
          description
        }
        instagram
        facebook
        tiktok  
        twitter
        youtube
      }
    }
  }
`