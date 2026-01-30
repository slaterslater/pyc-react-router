import { useMindBodyWidget } from "~/hooks/useMindbody"

export function MindBodySchedule() {
  useMindBodyWidget()

  return (
    <div className="mindbody-widget w-full outline-none mt-5" data-widget-type="Schedules" data-widget-id="254432542c3"></div>
  )
}