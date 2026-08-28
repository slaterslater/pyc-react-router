import { useParams, useRouteLoaderData } from "react-router";

export function useStudio() {
  const { studio } = useParams(); // only set on /studios/:studio/*

  const studioLayout = useRouteLoaderData("routes/studios.$studio")
  const studioSlugPage = useRouteLoaderData("routes/studios.$studio_.$slug")
  const studioData = studioLayout ?? studioSlugPage

  return {
    isStudioPage: Boolean(studioData),
    name: studioData?.name,
    studioName: studioData?.name,
    loginLink: studioData?.loginLink,
    studioLink: studio ? `/studios/${studio}` : "/studios",
    fullAddress: studioData?.fullAddress,
    studioData,
  }
}