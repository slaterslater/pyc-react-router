import { isNavLink } from "~/lib/isNavLink";
import { NavLink, type MenuLink } from "./navigation/NavLink";

export default function Offering({ offering }: { offering: OfferingType }) {
  const { title, subtitle, dates, time, cost, intensity, temperature, description, button } = offering;

  return (
    <div className="bg-cream p-8 lg:p-12 rounded-md flex flex-col gap-4">
      <div>
        <h3 className="text-xl uppercase font-semibold">{title}</h3>
        <h4 className="uppercase text-sm">{subtitle}</h4>
      </div>
      <div className="uppercase text-sm">
        {dates && <p><span className="font-bold mr-3">Date:</span>{dates}</p>}
        {time && <p><span className="font-bold mr-3">Time:</span>{time}</p>}
        {cost && <p><span className="font-bold mr-3">Cost:</span>{cost}</p>}
        <IntensityBadge intensity={intensity} />
        {temperature && temperature !== "na" && <p><span className="font-bold mr-3">Temperature:</span> {temperature}</p>}
      </div>
      <p className="text-md py-5 whitespace-pre-line">{description}</p>
      {isNavLink(button) && (
        <div className="flex justify-center items-center gap-2 mt-4 border border-black w-fit px-4 py-2 rounded-md">
          <img src="/pyc-icon.png" alt="" className="w-3 h-3" />
          <NavLink link={button} className="underline uppercase font-medium" />
        </div>
      )}
    </div>
  )
}

function IntensityBadge({ intensity }: { intensity: string }) {
  if (!intensity || intensity === "na") return null;
  return (
    <div className="flex gap-2 items-center">
      <p className="font-bold mr-3">Intensity:</p>
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
