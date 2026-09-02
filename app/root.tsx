import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";

import "./app.css";
import { payload } from "./lib/payloadClient.server";
import { SITE_QUERY } from "./graphql/queries/siteQuery";
import { getSite } from "./lib/getSite.server";
import { useSuppressMindbodyCartModal } from "./hooks/useSuppressMindbodyCartModal";
import { PageLayout } from "./components/PageLayout";
import { useState } from "react";
import { useInterval } from "usehooks-ts";
import GoogleTagManager from "./components/GoogleTagManager";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  },
  {
    rel: 'preconnect',
    href: 'https://widgets.mindbodyonline.com',
    crossOrigin: 'anonymous',
  },
];


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const site = getSite(request);
  const siteData = await payload.request(SITE_QUERY, { name: site.name, id: site.id });
  const announcements = siteData.Announcement.items.filter(({ sites }: { sites: { name: string }[] }) => sites.some(({ name }) => name.toLowerCase() === site.name.toLowerCase()));
  return {
    site,
    announcements,
    menu: siteData.Sites.docs[0].menuItems,
    studios: siteData.Studios.docs,
    footer: siteData.Sites.docs[0].footer,
    sites: {
      collective: process.env.HOSTNAME_COLLECTIVE!,
      canada: process.env.HOSTNAME_CANADA!,
      usa: process.env.HOSTNAME_USA!,
    },
    port: new URL(request.url).port,
    analytics: siteData.Sites.docs[0].analytics,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  useSuppressMindbodyCartModal() // suppresses the mindbody cart modal from auto-opening when returning to the site with an active MB cart session

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* <GoogleTagManager /> */}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />

      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  const isDev = import.meta.env.DEV;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (isDev && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const [count, setCount] = useState<number>(4)
  const navigate = useNavigate();

  const countdown = () => {
    if (count === 1) navigate("/")
    setCount(count - 1)
  }

  useInterval(countdown, !isDev ? 1000 : null)

  return (
    <PageLayout>
      <main className="pt-16 p-4 container mx-auto flex flex-col items-center justify-center gap-4">
        <h1 className="heading">{message}</h1>
        {!isDev && (
          <>
            <p className="subtitle">{details}</p>
            <p className="text-center">
              You will be redirected to the <Link to="/" className="underline">Homepage</Link> in&nbsp;
              <span
                className="inline-block align-middle text-center w-[1em]"
                aria-label={String(count)}
              >
                {count}
              </span>
              &nbsp;seconds
            </p>
          </>
        )}
        {isDev && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </PageLayout >
  );
}
