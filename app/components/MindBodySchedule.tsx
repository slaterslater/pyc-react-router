import { useMindBodyWidget } from "~/hooks/useMindBody"

export function MindBodySchedule({ scheduleId }: { scheduleId: string }) {
  useMindBodyWidget()

  return (
    <div
      className="mindbody-widget w-full outline-none mt-5 bg-cream rounded-md flex flex-col items-center justify-center"
      data-widget-type="Schedules"
      data-widget-id={scheduleId}
    />
  )
}