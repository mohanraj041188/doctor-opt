import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { json, LinksFunction } from "@remix-run/node";
import { getUserSession } from "./utlis/session.server";
import BackgroundImage from "./asserts/hospital-corridor.jpg";
import InnerPageBackgroundImage from "./asserts/page2Background.png";

import "./styles/index.scss";
import Layout from "./components/Layout";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderArgs) {
  const user = await getUserSession(request); // Fetch user session
  return {
    isLoggedIn: !!user,
    username: user?.name || null,
  };
}

function RootLayout() {
  const location = useLocation();
  const isInnerPage = location.pathname !== "/";
  const backgroundImageStyle = {
    backgroundImage: isInnerPage
      ? `url(${InnerPageBackgroundImage})`
      : `url(${BackgroundImage})`,
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <Layout>
            <Outlet />
          </Layout>
        </main>
        <ScrollRestoration />
        <Scripts />
        <div
          className={isInnerPage ? "background inner-background" : "background"}
        >
          <div style={backgroundImageStyle} className="background__image" />
          <div className="background__grid"></div>
          <div className="background__blur-xl"></div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
