import { useRouteLoaderData } from "react-router";

export const usePage = () => {
  const pageData = useRouteLoaderData("routes/$slug")

  return {
    title: pageData?.title,
  };
};

