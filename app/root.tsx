import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LoaderFunctionArgs,
} from "react-router";

import "./app.css";
import { ANNOUNCEMENTS_QUERY } from "./graphql/queries/announcementQuery";
import { payloadClient } from "./lib/payloadClient.server";
import { SITE_QUERY } from "./graphql/queries/siteQuery";
import { getSite } from "./lib/getSite.server";

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
];


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const site = getSite(url);
  const data = await payloadClient.request(ANNOUNCEMENTS_QUERY);
  const announcements = data.Announcement.items.filter(({ sites }: { sites: { name: string }[] }) => sites.some(({ name }) => name.toLowerCase() === site.name.toLowerCase()));
  const siteData = await payloadClient.request(SITE_QUERY, { name: site.name, id: site.id });
  return {
    data,
    announcements,
    // site: siteData.Sites.docs[0],
    menu: siteData.Sites.docs[0].menuItems,
    studios: siteData.Studios.docs,
    footer: siteData.Sites.docs[0].footer,
    sites: {
      collective: process.env.HOSTNAME_COLLECTIVE!,
      canada: process.env.HOSTNAME_CANADA!,
      usa: process.env.HOSTNAME_USA!,
    },
    port: url.port
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // create useeffect redirecet after 5 seconds to the home page

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
