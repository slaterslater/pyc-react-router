// app/graphql/fields/offeringFields.ts
import { LINK_FIELDS } from "./linkFields"

export const OFFERING_FIELDS = `
  title
  subtitle
  dates
  time
  cost
  description
  intensity
  temperature
  button {
    ${LINK_FIELDS}
  }
`