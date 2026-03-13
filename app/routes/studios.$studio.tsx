import type { LoaderFunctionArgs } from "react-router";
import { Hero } from "~/components/Hero";
import { PageLayout } from "~/components/PageLayout";

export function meta() {
  return [
    { title: "studio page | dev PYC" },
    { name: "description", content: "studio page" },
  ];
}

export function loader({ params }: LoaderFunctionArgs) {
  return {
    title: params.studio,
  }
}

export default function StudioRoute() {
  return (
    <PageLayout>
      <Hero title="main banner or video" />
    </PageLayout>
  )
}