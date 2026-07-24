import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/studios.$studio._index";

export function useStudio() {
  const data = useRouteLoaderData("routes/studios.$studio._index") as
    | Awaited<ReturnType<typeof loader>>
    | undefined;

  const name = data?.name
  const loginLink = data?.loginLink

  return {
    isStudioPage: Boolean(name),
    name,
    loginLink,
  }
}