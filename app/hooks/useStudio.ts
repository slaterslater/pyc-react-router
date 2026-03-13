import { useLoaderData } from "react-router";
import type { loader } from "~/routes/studios.$studio";

export function useStudio() {
  const data = useLoaderData<typeof loader>()

  return {
    isStudioPage: Boolean(data?.title),
    title: data?.title,
  }
}