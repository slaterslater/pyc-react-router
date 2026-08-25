import { gql } from "graphql-request";

export const MEDIA_FRAGMENT = gql`
  fragment MediaFragment on Media {
      mimeType    
      alt 
      url
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