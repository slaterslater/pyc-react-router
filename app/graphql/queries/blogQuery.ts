import { gql } from "graphql-request";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";
import { OFFERING_FIELDS } from "../fields/offeringFields";
import { LINK_FIELDS } from "../fields/linkFields";

export const BLOG_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query ($slug: String!) {
    Blogs(where: { slug: { equals: $slug } }) {
      docs {
        title
        slug
        metaDescription
        site {
          name
        }
        banner {
          media {
            ...MediaFragment
          }
        }
        content {
          ... on Grid {
            id
            blockType
            columns
            items {
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
                recipientEmail
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
            buttons { 
              ${LINK_FIELDS}
            }
          }
          ... on Widget {
            id
            blockType
            code
          }
          ... on AmenitiesBlock {
            id
            blockType
          }
          ... on LocationMap {
            id
            blockType
            address1
            address2
            city
            province
            state
            zip
            postalCode
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
          ... on Text {
            id
            blockType
            richText
          }
        }
      }
    }
  }
`;
