import { gql } from "graphql-request";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const PAGE_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query ($slug: String!) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        title
        site {
          name
        }
        banner {
          media {
            ...MediaFragment
          }
        }
        content {
          __typename
          ... on Grid {
            id
            blockType
            columns
            items {
              __typename
              ... on Banner {
                id
                blockType
                # ...Banner fields
              }
              ... on Text {
                id
                blockType
                richText
              }
              ... on OfferingBlock {
                id
                blockType
                # ...OfferingBlock fields
              }
              ... on Image {
                id
                blockType
                # ...Image fields
              }
              ... on ContactForm {
                id
                blockType
                # ...ContactForm fields
              }
            }
          }
          ... on Banner {
            id
            blockType
            # ...Banner fields
          }
          ... on Headline {
            id
            blockType
            # ...Headline fields
          }
          ... on Buttons {
            id
            blockType
            # ...Buttons fields
          }
          ... on Widget {
            id
            blockType
            # ...Widget fields
          }
          ... on AmenitiesBlock {
            id
            blockType
            # ...AmenitiesBlock fields
          }
          ... on LocationMap {
            id
            blockType
            # ...LocationMap fields
          }
          ... on Reviews {
            id
            blockType
            # ...Reviews fields
          }
        }
      }
    }
  }
`;
