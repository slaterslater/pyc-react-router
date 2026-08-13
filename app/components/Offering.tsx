import { NavLink, type MenuLink } from "./navigation/NavLink";

export default function Offering({ offering }: { offering: OfferingType }) {

  const { dates, time, cost, intensity, temperature } = offering;

  return (
    <div className="bg-cream p-4 rounded-md p-6 text-sm flex flex-col gap-4">
      <div>
        <h3 className="text-lg uppercase">{offering.title}</h3>
        <h4 className="lowercase italic">{offering.subtitle}</h4>
      </div>
      <div className="uppercase">
        {dates && <p>{dates}</p>}
        {time && <p>{time}</p>}
        {cost && <p>{cost}</p>}
        <IntensityBadge intensity={intensity} />
        {temperature && temperature !== "na" && <p>Temperature: {temperature}</p>}
      </div>
      <p>{offering.description}</p>
      {offering.button && (
        <NavLink
          key={offering.button?.id}
          link={offering.button}
          className="button btn-black min-w-[140px] sm:max-w-[220px] flex-1"
        />
      )}
    </div>
  )
}

function IntensityBadge({ intensity }: { intensity: string }) {
  if (!intensity || intensity === "na") return null;
  return (
    <div className="flex gap-2 items-center">
      <p>Intensity:</p>
      {Array.from({ length: Intensity[intensity as keyof typeof Intensity] }).map((_, index) => (
        <img src={`/pyc-icon.png`} alt="" key={index} className="w-3 h-3" />
      ))}
    </div>
  )
}

export type OfferingType = {
  title: string
  subtitle: string
  dates: string
  time: string
  cost: string
  intensity: string
  temperature: string
  description: string
  button: MenuLink
  id: string
}

enum Intensity {
  na,
  low,
  medium,
  high,
}
