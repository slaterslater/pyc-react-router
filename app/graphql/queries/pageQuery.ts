import { gql } from "graphql-request";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";
import { OFFERING_FIELDS } from "../fields/offeringFields";
import { IMAGE_FIELDS } from "../fields/imageFields";
import { LINK_FIELDS } from "../fields/linkFields";

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
                ${OFFERING_FIELDS}
              }
              ... on Image {
                id
                blockType
                media: image {
                  ...MediaFragment
                }
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
            title
            button {
              ${LINK_FIELDS}
            }
              media {
                ...MediaFragment
              }
          }
          ... on Headline {
            id
            blockType
            heading
            subtitle
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
            reviews {
              id
              text
              name
              description
            }
          }
        }
      }
    }
  }
`;
