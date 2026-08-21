import { useRouteLoaderData } from "react-router";
import { MindbodyLink } from "./MindbodyLink";

export default function IntroOffer() {
  const { name, introOffer } = useRouteLoaderData("routes/studios.$studio")

  if (!introOffer) return null;

  const studioName = name.toUpperCase().startsWith('PYC') ?
    name : `Power Yoga ${name}`;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="heading text-center capitalize">New to {studioName}?</h2>
      <p className="subtitle">Get started with our 30 Days Unlimited Yoga Intro Special available at every studio. Find the flexible class passes or membership to power your practice</p>
      <MindbodyLink html="" className="btn-red">View Intro Offer</MindbodyLink>
    </div>
  )
}