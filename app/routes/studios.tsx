import { Outlet } from "react-router";
import { PageLayout } from "~/components/PageLayout";

export default function StudioLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}