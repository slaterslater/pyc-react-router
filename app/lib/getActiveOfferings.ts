import type { OfferingType } from "~/components/Offering";

export function getActiveOfferings(offerings: OfferingType[]) {
  console.log(offerings);
  return offerings.filter((offering) => offering.isActive);
}
