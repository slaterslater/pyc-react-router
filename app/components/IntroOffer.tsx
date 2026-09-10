import { useRouteLoaderData } from "react-router";
import { MindbodyLink } from "./MindbodyLink";
import { useStudio } from "~/hooks/useStudio";

export default function IntroOffer() {
  const { introOffer } = useRouteLoaderData("routes/studios.$studio")
  const { pycStudioName } = useStudio();

  return (
    <div className="flex flex-col gap-8 p-4 items-center">
      <h2 className="heading text-center capitalize">New to {pycStudioName}?</h2>
      <p className="subtitle">Get started with our Intro Special available at every studio. Find the flexible class passes or membership to power your practice</p>
      <MindbodyLink html={introOffer} className="btn-red w-fit px-4 py-2 uppercase">View Intro Offer</MindbodyLink>
    </div>
  )
}