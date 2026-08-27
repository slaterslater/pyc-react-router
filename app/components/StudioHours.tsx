export default function StudioHours({ days }: { days: HoursOfOperationType[] }) {
  if (!days || days.length === 0) return null;
  return (
    <div className="w-fit">
      {days.map((day) => (
        <HoursOfOperation key={day.id} hoursOfOperation={day} />
      ))}
    </div>
  )
}

function HoursOfOperation({ hoursOfOperation }: { hoursOfOperation: HoursOfOperationType }) {
  const { day, isClosed, openTime, openMeridiem, closeTime, closeMeridiem } = hoursOfOperation;
  return (
    <p className="flex justify-end items-center">
      <span className="capitalize mr-auto pr-5">{day}:</span>
      {isClosed && 'Closed'}
      {!isClosed && (
        <>
          <Time time={openTime} meridiem={openMeridiem} />
          <span className="mx-3 text-xs">-</span>
          <Time time={closeTime} meridiem={closeMeridiem} />
        </>
      )}
    </p>
  )
}

function Time({ time, meridiem }: { time: string, meridiem: string }) {
  return (
    <>
      <span>{time.replace('_', '')}</span>
      <span className="ml-1 text-xs">{meridiem}</span>
    </>
  )
}

type HoursOfOperationType = {
  id: string
  day: string
  isClosed: boolean
  openTime: string
  openMeridiem: string
  closeTime: string
  closeMeridiem: string
}