import { gql } from "graphql-request";
import { OFFERING_FRAGMENT } from "../fragments/offeringFragment";
import { LINK_FIELDS } from "../fields/linkFields";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const STUDIO_QUERY = gql`
  ${OFFERING_FRAGMENT}
  ${MEDIA_FRAGMENT}
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
            ...MediaFragment
          }
          button {
            ${LINK_FIELDS}
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
          ${LINK_FIELDS}
        }
        workshops(limit: 1) {
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