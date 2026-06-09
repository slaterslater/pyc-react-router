import { useLoaderData } from "react-router";
import type { loader } from "~/routes/studios.$studio";

export function useStudio() {
  const { name } = useLoaderData<typeof loader>()

  return {
    isStudioPage: Boolean(name),
    name,
  }
}