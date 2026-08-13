import { useParams, useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/studios.$studio";

export function useStudio() {
  const { studio } = useParams(); // only set on /studios/:studio/*

  const studioData = useRouteLoaderData("routes/studios.$studio") as
    | Awaited<ReturnType<typeof loader>>
    | undefined;

  return {
    isStudioPage: Boolean(studio), // not /studios list, not home
    name: studioData?.name,
    loginLink: studioData?.loginLink,
    studioLink: studio ? `/studios/${studio}` : "/studios",
  };
}