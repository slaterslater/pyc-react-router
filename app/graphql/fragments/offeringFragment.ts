import { gql } from "graphql-request";

export const OFFERING_FRAGMENT = gql`
  fragment OfferingFragment on OfferingItem {
    title
    subtitle
    dates
    time
    cost
    description
    intensity 
    temperature
  }
`;