import { gql } from "graphql-request";

export const SITEMAP_QUERY = gql`
  query Sitemap($siteId: JSON!) {
    Pages(
      limit: 0
      where: { site: { in: [1, $siteId] }, studio: { exists: false } }
    ) {
      docs {
        title
        slug
        updatedAt
      }
    }
    StudiosPages: Pages(
      limit: 0
      where: { site: { in: [1, $siteId] }, studio: { exists: true } }
    ) {
      docs {
        title
        slug
        studio {
          slug
        }
        updatedAt
      }
    }
    Blogs(
      where: { site: { in: [1, $siteId] } }
      limit: 0
      sort: "date"
    ) {
      docs {
        id
        title
        slug
        date
      }
    }
    Studios(
      where: { site: { equals: $siteId } }
      limit: 0
      sort: "name"
    ) {
      docs {
        id
        name
        slug
        updatedAt
      }
    }
  }
`;