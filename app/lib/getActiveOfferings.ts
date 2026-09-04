import type { OfferingType } from "~/components/Offering";

export function getActiveOfferings(offerings: OfferingType[]) {
  return offerings?.filter((offering) => offering.isActive);
}
