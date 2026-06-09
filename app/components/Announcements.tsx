import { useRouteLoaderData } from "react-router"

export function Announcements() {
  const { site, data } = useRouteLoaderData('root')

  return (
    <div className="bg-charcoal text-cream min-w-xs w-full py-3">
      <h2 className="uppercase text-xs text-center font-bold">power yoga canada announcement banner</h2>
    </div>
  )
}