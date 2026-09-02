import { gql } from "graphql-request";
import { LINK_FIELDS } from "../fields/linkFields";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const HOMEPAGE_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query ($name: String!) {
    Sites(where: { name: { equals: $name } }) {
      docs {
        id
        name
        banner1 {
          title
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }
        banner2 {
          title
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }
        banner3 {
          title
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }
        description1
        description2
        cards {
          id
          title
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }
        homepageNav {
          ${LINK_FIELDS}
        }
        reviews {
          id
          text
          name
          description
        }
        featureTitle
        feature1 {
          title
          description
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }    
        feature2 {
          title
          description
          button {
            ${LINK_FIELDS}
          }
          media {
            ...MediaFragment
          }
        }
        seoTitle
        seoDescription
      }
    }
  }
`;
