import { useLoaderData } from "react-router";
import type { loader } from "~/routes/studios.$studio";

export function useStudio() {
  const data = useLoaderData<typeof loader>()
  const name = data?.name

  return {
    isStudioPage: Boolean(name),
    name,
  }
}