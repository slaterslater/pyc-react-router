export const ALL_STUDIOS_QUERY = `
  query AllStudios($id: JSON!) {
    Studios(
    where: { site: { equals: $id } }
    limit: 0
    sort: "name"
  ) {
      docs {
        id
        name
        slug
  address1
  address2
  city
  province
  state
  zip
  postalCode
  phone
  email
      }
    }
  }
`;