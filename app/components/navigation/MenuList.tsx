import { useRouteLoaderData } from "react-router"

export function MenuList() {
  const { menu } = useRouteLoaderData('root')
  console.log({ menu })
  return (
    null
  )
}