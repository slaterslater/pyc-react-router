import { gql } from "graphql-request";

export const ANNOUNCEMENTS_QUERY = gql`
query {
  Announcement {
    items {
      sites {
        name
      }
      text
    }
  }
}
`;

