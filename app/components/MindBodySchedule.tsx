import { useMindBodyWidget } from "~/hooks/useMindBody"

export function MindBodySchedule() {
  useMindBodyWidget()

  return (
    <div className="mindbody-widget w-full outline-none mt-5 bg-[#FAF9F7] rounded-md min-h-[500px] flex flex-col items-center justify-center" data-widget-type="Schedules" data-widget-id="254432542c3"></div>
  )
}