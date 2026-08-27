import { gql } from "graphql-request";

export const ALL_BLOGS_QUERY = gql`
  query AllBlogs($siteId: JSON!) {
    Blogs(
      where: { site: { in: [1, $siteId] } }
      limit: 0
      sort: "date"
    ) {
      docs {
        id
        title
        date
        slug
        banner {
          media {
            thumbnailURL
          }
        }
      }
    }
  }
`;