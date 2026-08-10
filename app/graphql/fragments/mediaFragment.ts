import { gql } from "graphql-request";

export const MEDIA_FRAGMENT = gql`
  fragment MediaFragment on Media {
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
`;