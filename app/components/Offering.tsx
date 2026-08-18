import { NavLink, type MenuLink } from "./navigation/NavLink";

export default function Offering({ offering }: { offering: OfferingType }) {

  const { dates, time, cost, intensity, temperature } = offering;

  return (
    <div className="bg-cream p-8 lg:p-12 rounded-md flex flex-col gap-4">
      <div>
        <h3 className="text-lg uppercase">{offering.title}</h3>
        <h4 className="lowercase italic">{offering.subtitle}</h4>
      </div>
      <div className="uppercase text-sm">
        {dates && <p><span className="font-medium mr-3">Date:</span>{dates}</p>}
        {time && <p><span className="font-medium mr-3">Time:</span>{time}</p>}
        {cost && <p><span className="font-medium mr-3">Cost:</span>{cost}</p>}
        <IntensityBadge intensity={intensity} />
        {temperature && temperature !== "na" && <p><span className="font-medium mr-3">Temperature:</span> {temperature}</p>}
      </div>
      <p className="text-md py-5">{offering.description}</p>
      {offering.button && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <img src="/pyc-icon.png" alt="" className="w-3 h-3" />
          <NavLink
            key={offering.button?.id}
            link={offering.button}
            className="underline uppercase"
          />
        </div>
      )}
    </div>
  )
}

function IntensityBadge({ intensity }: { intensity: string }) {
  if (!intensity || intensity === "na") return null;
  return (
    <div className="flex gap-2 items-center">
      <p className="font-medium mr-3">Intensity:</p>
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
