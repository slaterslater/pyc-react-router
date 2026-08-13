import { gql } from "graphql-request";

const BUTTON_FRAGMENT = gql`
  fragment ButtonFragment on OfferingItem_Button {
    id
    type
    text
    url
    mboLink
    page {
      slug
    }
  }
`

export const OFFERING_FRAGMENT = gql`
  ${BUTTON_FRAGMENT}
  fragment OfferingFragment on OfferingItem {
    title
    subtitle
    dates
    time
    cost
    description
    intensity 
    temperature
    button {
      ...ButtonFragment
    }
  }
`;

