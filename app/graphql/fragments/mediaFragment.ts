import { gql } from "graphql-request";

export const MEDIA_FRAGMENT = gql`
  fragment MediaFragment on Media {
      mimeType    
      alt 
      url
      filename
      sizes {
        thumbnail {
          url
          filename
        }
        tablet {
          url
          filename
        }
        desktop {
          url
          filename
        }
      }
    }
`;