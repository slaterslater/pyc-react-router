import { gql } from "graphql-request";

export const STUDIO_QUERY = gql`
  query ($studio: String) {
    Studios(where: { slug: { equals: $studio } }) {
      docs {
        banner {
          title
        }
        schedule
        studioNav {
          text
        }
      }
    }
}`