import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect as redirect$1, json } from "@remix-run/node";
import { RemixServer, Form, useActionData, useLoaderData, Link, useLocation, Meta, Links, Outlet, ScrollRestoration, Scripts, useSearchParams, useParams, useNavigate, redirect } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useEffect } from "react";
import { ClientOnly } from "remix-utils/client-only";
import puppeteer from "puppeteer";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const sessionSecret = process.env.SESSION_SECRET || "default_secret";
const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true
  }
});
async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return storage.getSession(cookie);
}
async function getUserSession(request) {
  const session = await getSession(request);
  return session.get("user");
}
async function commitSession(session) {
  return storage.commitSession(session);
}
async function destroySession(request) {
  const session = await getSession(request);
  return storage.destroySession(session);
}
const BackgroundImage = "/assets/hospital-corridor-UY3x4ZAK.jpg";
const InnerPageBackgroundImage = "/assets/page2background-BdyGXLDH.png";
function CloseIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      fill: "currentColor",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M7 17L17 7M17 17L7 7",
          stroke: "#0A0C10",
          strokeWidth: "2.25",
          strokeMiterlimit: "10",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15 15L21 21",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function LogoIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      viewBox: "0 0 128 128",
      fill: "#171617",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          transform: "matrix(.1347 0 0 .1347 3874.986 -1363.247)",
          d: "M-28134.268 10198.376c-9.904-.278-20.645 1.116-32.361 4.885-27.758 8.652-46.59 26.516-56.771 48.009-9.764 20.934-13.111 68.803-13.111 68.803l-112.848.418s-3.348-48.148-13.25-69.221c-9.904-21.493-28.875-39.775-56.494-48.009-11.02-3.21-22.457-5.163-32.5-4.885-29.57.697-311.477 65.313-314.824 70.896-1.256 2.094 37.662 39.495 96.805 82.619l56.633-56.661 23.434 23.445-52.588 52.614c17.855 12.002 36.826 24.144 56.771 35.867l56.074-56.104 23.436 23.446-49.24 49.265c17.297 9.211 35.15 17.863 53.285 25.4l56.213-56.243 23.434 23.446-45.752 43.848c52.17 17.725 105.035 13.005 152.461 13.005h45.195c44.914 0 94.154-4.492 143.252-21.379l-37.383-36.438 23.436-22.965 47.982 48.25c18.414-7.536 36.408-15.79 54.123-24.442l-41.848-41.808 23.434-23.416 49.24 49.28c20.504-11.164 40.033-22.74 58.445-34.185l-47.426-47.447 23.434-23.443 52.447 52.476c61.793-41.031 102.943-76.339 101.549-78.433-3.21-5.58-285.114-70.196-314.687-70.893zm-185.38 290.111 4.498 565.808v.419c0 4.744 3.027 8.513 7.77 8.513 4.604-.14 7.49-4.048 7.49-8.513v-.419l33.527-565.808h-53.285zm26.642-361.007c-34.453 0-62.49 27.074-62.49 61.545 0 22.19 11.717 36.919 29.293 47.805l1.953 68.459h62.49l1.953-68.459c17.574-10.886 29.291-25.019 29.291-47.349 0-34.331-28.037-62.001-62.49-62.001zm-27.199 806.374c-7.812-2.372-14.506-5.304-20.086-8.932-11.16-7.536-15.764-15.771-15.764-23.446s4.604-15.91 15.764-23.306c4.881-3.35 11.018-6.421 18.271-8.514-.418-13.956-.836-27.912-1.256-42.007-15.482-3.489-29.012-9.072-39.613-16.189-16.879-11.583-24.83-25.261-24.83-39.217 0-13.677 7.951-27.632 24.83-39.216 10.043-6.698 22.318-12.142 36.406-15.491-.279-13.956-.559-27.912-.977-41.728-23.852-4.467-44.914-12.979-60.957-24.144-23.572-16.05-35.848-36.426-35.848-57.499-.279-38.658 26.084-31.4 52.867-39.355 12.553-3.769 22.875-8.653 30.686-16.189 3.906-3.768 8.51-8.933 8.789-17.724-2.65-22.609-25.527-26.237-41.707-26.099-7.254.279-13.252 1.257-15.484 1.396-50.354 7.396-67.791 68.245-69.047 97.971 0 35.448 20.924 66.012 51.193 86.945 10.182 6.979 21.48 12.979 33.617 17.725-2.791 1.535-5.58 3.35-8.23 5.163-23.434 15.909-40.174 40.193-40.174 68.244 0 28.331 16.74 52.335 40.174 68.245a145.44 145.44 0 0 0 19.389 11.024c-16.6 11.724-28.316 29.448-28.316 49.963 0 21.911 13.391 40.333 31.246 52.057 11.576 7.815 25.107 13.117 40.172 16.188-.418-11.999-.836-23.863-1.115-35.865zm-49.797-428.448c8.787 0 15.762 3.908 15.762 8.793 0 4.745-6.975 8.652-15.762 8.652-8.789 0-15.764-3.907-15.764-8.652 0-4.885 6.975-8.793 15.764-8.793zm242.15 88.761c-1.256-29.726-18.691-90.714-69.047-97.971-6.555-.698-13.111-1.396-18.551-1.396-15.902.279-35.988 4.886-38.639 26.099.418 8.791 4.881 13.956 8.787 17.724 7.951 7.536 18.133 12.421 30.688 16.189 26.781 7.955 53.285.697 52.865 39.355 0 21.073-12.273 41.449-35.848 57.499-16.041 11.164-37.104 19.677-60.957 24.144-.418 13.815-.836 27.771-1.254 41.728 13.809 3.35 21.131 8.513 30.756 15.073 17.016 11.164 20.711 24.98 20.711 38.657V10772.245c0 13.956-2.998 27.634-19.875 39.217-10.461 7.117-21.654 12.979-37.137 16.329-.42 13.955.609 27.911.191 41.867 6.695 2.093 8.828 4.885 13.709 8.094 11.438 7.397 12.594 15.492 12.594 23.028v.697c0 7.676-.014 15.91-11.172 23.446-5.301 3.628-10.26 6.56-18.07 8.932-.279 12.002.658 23.865.24 35.867 14.926-3.071 22.855-8.373 34.154-16.188 17.715-11.444 25.365-29.588 25.365-50.939v-2.792c0-19.817-5.926-36.844-21.828-48.288 6.975-3.209 9.713-6.978 15.852-11.024 23.293-15.91 36.494-39.774 36.494-67.407v-2.931c0-27.772-11.002-51.219-34.576-66.988-2.371-1.396-1.246-2.931-3.617-4.188 12.414-4.884 25.111-10.885 35.154-17.863 30.271-20.935 53.011-51.499 53.011-86.947zm-82.996-71.315c-8.787 0-15.762-3.907-15.762-8.652 0-4.885 6.975-8.793 15.762-8.793 8.789 0 15.762 3.908 15.762 8.793 0 4.744-6.973 8.652-15.762 8.652z"
        }
      )
    }
  );
}
function MailIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M12 4C19 4 21 4.88889 21 12C21 19.1111 19 20 12 20C5 20 3 19 3 12C3 5 5 4 12 4Z",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M6 10C9 13 10.5 14 12 14C13.5 14 15 13 18 10",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function TwitterIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M19.1893 8.68435C19.1893 8.89786 19.1893 9.00461 19.1893 9.21811C19.1893 14.2354 15.4615 20 8.64497 20C6.6213 20 4.59763 19.4662 3 18.292C3.31953 18.292 3.63905 18.3987 3.85207 18.3987C5.55621 18.3987 7.15385 17.865 8.43195 16.7975C6.83432 16.7975 5.4497 15.7299 4.91716 14.1287C5.4497 14.1287 6.08876 14.1287 6.6213 13.9152C4.91716 13.5949 3.63905 11.9936 3.63905 10.2856C4.1716 10.6059 4.70414 10.7126 5.3432 10.7126C3.74556 9.64512 3.21302 7.40334 4.1716 5.69531C6.08876 8.04385 8.85799 9.43161 11.8402 9.53836C11.5207 8.25735 11.9467 6.86958 12.9053 6.01557C14.3964 4.6278 16.7396 4.6278 18.1243 6.22907C18.9763 6.01557 19.7219 5.80207 20.4675 5.26831C20.1479 6.12232 19.6154 6.86958 18.8698 7.40334C19.6154 7.29659 20.3609 7.08308 21 6.76283C20.4675 7.51009 19.8284 8.1506 19.1893 8.68435Z",
          stroke: "#0A0C10",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function InstagramIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeMiterlimit: "10",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M21 12.5294C21 18.5 19 21 12 21C5 21 3 19 3 12C3 5.5 5 3 12 3C19.5 3 21 5.5 21 12.5294Z",
            stroke: "#0A0C10",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M16.5 7.5C16.7761 7.5 17 7.27614 17 7C17 6.72386 16.7761 6.5 16.5 6.5C16.2239 6.5 16 6.72386 16 7C16 7.27614 16.2239 7.5 16.5 7.5Z",
            fill: "#0A0C10",
            stroke: "#0A0C10",
            strokeWidth: "1.25",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function LocationIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      strokeWidth: "1.5",
      stroke: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }),
        /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" })
      ]
    }
  );
}
function PopupModal({ onClose, children }) {
  return /* @__PURE__ */ jsx("div", { className: "popup-modal", children: /* @__PURE__ */ jsxs("div", { className: "popup-modal__wrapper", children: [
    /* @__PURE__ */ jsxs("div", { className: "popup-modal__header", children: [
      /* @__PURE__ */ jsx("div", { className: "popup-modal__header-logo", children: /* @__PURE__ */ jsx(LogoIcon, { className: "header__logo" }) }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "popup-modal__header-cta", children: /* @__PURE__ */ jsx(CloseIcon, { className: "popup-modal__header-cta_icon" }) })
    ] }),
    children
  ] }) });
}
function LoginForm() {
  return /* @__PURE__ */ jsxs(Form, { action: "/signin", method: "post", className: "login-form", children: [
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email address / Mobile Number" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          placeholder: "Email address / Mobile Number",
          name: "email",
          id: "email",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          name: "password",
          placeholder: "Password",
          id: "password",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "submit-button", children: "Login" })
  ] });
}
function SignupForm() {
  return /* @__PURE__ */ jsxs(Form, { action: "/signin", method: "post", className: "login-form", children: [
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "fullName", children: "Full Name" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Full Name",
          name: "full name",
          id: "fullName"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "gender", children: "Gender" }),
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Gender", name: "gender", id: "gender" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "phone-number", children: "Phone Number" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          placeholder: "Phone Number",
          name: "phone-number",
          id: "phone-number",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          placeholder: "Email address",
          name: "email",
          id: "email",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "New Password" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          name: "password",
          placeholder: "New Password",
          id: "password",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "submit-button", children: "Sign Up" })
  ] });
}
const navLinks$1 = [
  {
    label: "Sign In",
    link: "/signin",
    isBtnStyle: false,
    isModal: true
  },
  {
    label: "Create Account",
    link: "/signup",
    isBtnStyle: true,
    isModal: true,
    methodType: "signup"
  }
];
function HeaderComponent$1() {
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setSignup] = useState(false);
  const actionData = useActionData();
  const { isLoggedIn, username } = useLoaderData();
  const handleModalOpen = (methodType) => {
    if (methodType === "signup") {
      setSignup(true);
    } else {
      setSignup(false);
    }
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleSignup = (value) => {
    setSignup(value);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "header", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Doctor OPT" }),
        /* @__PURE__ */ jsx(LogoIcon, { className: "header__logo" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "header__navigations", children: isLoggedIn ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/my-account",
            className: "header__navigations--items",
            children: [
              "Welcome, ",
              username,
              "!"
            ]
          }
        ),
        /* @__PURE__ */ jsx("form", { action: "/logout", method: "post", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "header__navigations--items header__navigations--items-button", children: "Logout" }) })
      ] }) : navLinks$1.map(
        (item2, index) => item2.isModal ? /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleModalOpen(item2.methodType),
            className: "header__navigations--items " + (item2.isBtnStyle ? "header__navigations--items-button" : ""),
            children: /* @__PURE__ */ jsx("span", { className: "header__navigations--items_text", children: item2.label })
          },
          index
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            to: item2.link,
            className: "header__navigations--items " + (item2.isBtnStyle ? "header__navigations--items-button" : ""),
            children: /* @__PURE__ */ jsx("span", { className: "header__navigations--items_text", children: item2.label })
          },
          index
        )
      ) })
    ] }),
    !isLoggedIn ? /* @__PURE__ */ jsx("div", { className: `modal-overlay ${showModal && !isLoggedIn ? "show" : ""}`, children: /* @__PURE__ */ jsx(PopupModal, { onClose: handleModalClose, children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "popup-modal__body", children: [
        /* @__PURE__ */ jsx("h1", { className: "popup-modal__body--title", children: showSignup ? /* @__PURE__ */ jsx(Fragment, { children: "Create a new account" }) : /* @__PURE__ */ jsx(Fragment, { children: "Welcome Back" }) }),
        /* @__PURE__ */ jsx("p", { className: "popup-modal__body--description", children: showSignup ? /* @__PURE__ */ jsx(Fragment, { children: "It's quick and easy." }) : /* @__PURE__ */ jsx(Fragment, { children: "Input your email to receive a one-time login code to sign in." }) }),
        /* @__PURE__ */ jsxs("div", { className: "popup-modal__body--form", children: [
          (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("p", { className: "error", children: actionData.error }),
          showSignup ? /* @__PURE__ */ jsx(SignupForm, {}) : /* @__PURE__ */ jsx(LoginForm, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "popup-modal__footer", children: /* @__PURE__ */ jsx("p", { className: "popup-modal__footer--text", children: showSignup ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => handleSignup(!showSignup), children: "Sign In" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => handleSignup(!showSignup), children: "Sign Up" })
      ] }) }) })
    ] }) }) }) : /* @__PURE__ */ jsx(Fragment, {})
  ] });
}
const navLinks = [
  {
    label: "Sign In",
    link: "/signin",
    isBtnStyle: false,
    isModal: true
  },
  {
    label: "Create Account",
    link: "/signup",
    isBtnStyle: true,
    isModal: true,
    methodType: "signup"
  }
];
function HeaderComponent() {
  const { isLoggedIn, username } = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setSignup] = useState(false);
  const actionData = useActionData();
  const handleModalOpen = (methodType) => {
    if (methodType === "signup") {
      setSignup(true);
    } else {
      setSignup(false);
    }
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleSignup = (value) => {
    setSignup(value);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "header inner-header", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Doctor OPT" }),
        /* @__PURE__ */ jsx(LogoIcon, { className: "header__logo" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "header__center-center", children: /* @__PURE__ */ jsxs("ul", { className: "nav-link_list", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "nav-link_list-item", to: "/", children: "Find Doctors" }) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "nav-link_list-item", to: "/", children: "Video Consult" }) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { className: "nav-link_list-item", to: "/", children: "Surgeries" }) }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "header__navigations", children: isLoggedIn ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/my-account",
            className: "header__navigations--items",
            children: [
              "Welcome, ",
              username,
              "!"
            ]
          }
        ),
        /* @__PURE__ */ jsx("form", { action: "/logout", method: "post", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "header__navigations--items header__navigations--items-button", children: "Logout" }) })
      ] }) : navLinks.map(
        (item2, index) => item2.isModal ? /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleModalOpen(item2.methodType),
            className: "header__navigations--items " + (item2.isBtnStyle ? "header__navigations--items-button" : ""),
            children: /* @__PURE__ */ jsx("span", { className: "header__navigations--items_text", children: item2.label })
          },
          index
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            to: item2.link,
            className: "header__navigations--items " + (item2.isBtnStyle ? "header__navigations--items-button" : ""),
            children: /* @__PURE__ */ jsx("span", { className: "header__navigations--items_text", children: item2.label })
          },
          index
        )
      ) })
    ] }),
    !isLoggedIn ? /* @__PURE__ */ jsx("div", { className: `modal-overlay ${showModal ? "show" : ""}`, children: /* @__PURE__ */ jsx(PopupModal, { onClose: handleModalClose, children: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "popup-modal__body", children: [
        /* @__PURE__ */ jsx("h1", { className: "popup-modal__body--title", children: showSignup ? /* @__PURE__ */ jsx(Fragment, { children: "Create a new account" }) : /* @__PURE__ */ jsx(Fragment, { children: "Welcome Back" }) }),
        /* @__PURE__ */ jsx("p", { className: "popup-modal__body--description", children: showSignup ? /* @__PURE__ */ jsx(Fragment, { children: "It's quick and easy." }) : /* @__PURE__ */ jsx(Fragment, { children: "Input your email to receive a one-time login code to sign in." }) }),
        /* @__PURE__ */ jsxs("div", { className: "popup-modal__body--form", children: [
          (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ jsx("p", { className: "error", children: actionData.error }),
          showSignup ? /* @__PURE__ */ jsx(SignupForm, {}) : /* @__PURE__ */ jsx(LoginForm, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "popup-modal__footer", children: /* @__PURE__ */ jsx("p", { className: "popup-modal__footer--text", children: showSignup ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => handleSignup(!showSignup), children: "Sign In" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => handleSignup(!showSignup), children: "Sign Up" })
      ] }) }) })
    ] }) }) }) : /* @__PURE__ */ jsx(Fragment, {})
  ] });
}
const socialLinks = [
  {
    href: "#",
    icon: MailIcon,
    label: "Sign In"
  },
  {
    href: "#",
    icon: TwitterIcon,
    label: "Twitter"
  },
  {
    href: "#",
    icon: InstagramIcon,
    label: "Instagram"
  }
];
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "footer__navigations", children: [
      /* @__PURE__ */ jsx("p", { className: "footer__copyright--text", children: "© 2024 Doctor Opt." }),
      /* @__PURE__ */ jsx(Link, { to: "/terms", className: "footer__navigations--items", children: /* @__PURE__ */ jsx("span", { className: "footer__navigations--items_text", children: "Terms of Use" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "footer__navigations", children: socialLinks.map((link, index) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: link.href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "footer__navigations--items",
        children: [
          /* @__PURE__ */ jsx("span", { className: "footer__navigations--items_text sr-only", children: link.label }),
          /* @__PURE__ */ jsx(link.icon, { className: "w-8 h-8" })
        ]
      },
      index
    )) })
  ] });
}
const Layout = ({ children }) => {
  const location = useLocation();
  const isInnerPage = location.pathname !== "/";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("header", { children: isInnerPage ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(HeaderComponent, {}) }) : /* @__PURE__ */ jsx(HeaderComponent$1, {}) }),
    /* @__PURE__ */ jsx("div", { className: isInnerPage ? "layout inner-layout" : "layout", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
async function loader$2({ request }) {
  const user = await getUserSession(request);
  return {
    isLoggedIn: !!user,
    username: (user == null ? void 0 : user.name) || null
  };
}
function RootLayout() {
  const location = useLocation();
  const isInnerPage = location.pathname !== "/";
  const backgroundImageStyle = {
    backgroundImage: isInnerPage ? `url(${InnerPageBackgroundImage})` : `url(${BackgroundImage})`
  };
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: isInnerPage ? "background inner-background" : "background",
          children: [
            /* @__PURE__ */ jsx("div", { style: backgroundImageStyle, className: "background__image" }),
            /* @__PURE__ */ jsx("div", { className: "background__grid" }),
            /* @__PURE__ */ jsx("div", { className: "background__blur-xl" })
          ]
        }
      )
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: RootLayout,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const Map = () => {
  const [searchParams] = useSearchParams();
  const zoom = searchParams.get("zoom") || "14";
  const [location, setLocation] = useState(null);
  const lat = searchParams.get("lat") || (location == null ? void 0 : location.lat);
  const lng = searchParams.get("lng") || (location == null ? void 0 : location.lng);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const imageUrl = `/map?lat=${lat}&lng=${lng}&zoom=${zoom}&amenity=hospital`;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "search-results_map--background-img", style: { backgroundImage: `url(${imageUrl})` } }) });
};
function DoctorOverview({ name }) {
  return /* @__PURE__ */ jsxs("div", { className: "search-results", children: [
    /* @__PURE__ */ jsxs("div", { className: "search-results__banner", children: [
      /* @__PURE__ */ jsxs("section", { className: "doctor-overview", children: [
        /* @__PURE__ */ jsx("h1", { className: "single-asset-main-title", children: name }),
        /* @__PURE__ */ jsxs("div", { className: "single-asset-main-description", children: [
          /* @__PURE__ */ jsx("h2", { children: "293 doctors available in Chennai" }),
          /* @__PURE__ */ jsx("p", { children: "Book appointments with minimum wait-time & verified doctor details" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "divider" }),
      /* @__PURE__ */ jsx("section", { className: "search-results_map", children: /* @__PURE__ */ jsx("div", { className: "search-results_map--background", children: /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx("p", { children: "Loading..." }), children: () => /* @__PURE__ */ jsx(Map, {}) }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divider-horizontal" })
  ] });
}
const loader$1 = async ({ params }) => {
  const { slug } = params;
  const originalText = slug.replace(/-/g, " ");
  return { slug, originalText };
};
const meta$1 = () => {
  const { slug } = useParams();
  return [
    { title: `Best ${slug.replace(/-/g, " ")} In Chennai - Instant Appointment Booking, View Fees, Feedbacks | DocOct` },
    { name: "description", content: `Best ${slug.replace(/-/g, " ")} in Chennai. Book Doctor&#x27;s Appointment Online, View Fees, User feedbacks, Address &amp; Phone Numbers of ${slug.replace(/-/g, " ")} in Chennai | DocOct` }
  ];
};
function SearchResult() {
  const { slug } = useParams();
  useLoaderData();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(DoctorOverview, { name: slug.replace(/-/g, " ") }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchResult,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Typewriter = ({ texts, delay, infinite, cursor }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  useEffect(() => {
    if (texts.length === 0) return;
    let timeout;
    if (charIndex < texts[currentIndex].length) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + texts[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, delay);
    } else if (currentIndex < texts.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setCurrentIndex((prev) => prev + 1);
      }, delay * 20);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setCurrentIndex(0);
      }, delay * 3);
    }
    return () => clearTimeout(timeout);
  }, [texts, currentIndex, charIndex, delay, infinite]);
  return /* @__PURE__ */ jsxs("span", { className: "typewriter", children: [
    currentText,
    /* @__PURE__ */ jsx("span", { className: "typewriter__cursor", children: cursor })
  ] });
};
const slugify = (text) => {
  return text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
};
const SearchBannerForm = ({ suggestions: suggestions2 }) => {
  const [search, setSearch] = React.useState("");
  const [visible, setVisibility] = React.useState(false);
  const [animateSearch, setAnimeSearch] = React.useState(false);
  const [hideTyping, setHideTyping] = React.useState(false);
  const navigate = useNavigate();
  const searchSuggestText = [
    "Search by doctor name ...",
    "Search by clinic name ...",
    "Search by hospital ...",
    "Search for speciality ..."
  ];
  const handleSearch = (event) => {
    setVisibility(true);
    setSearch(event.target.value);
    if (event.target.value.length > 0) {
      setHideTyping(true);
      setAnimeSearch(true);
    } else {
      setHideTyping(false);
      setVisibility(false);
      event.target.blur();
    }
  };
  const selectOption2 = (value) => {
    setSearch(value);
    setVisibility(false);
    const slug = slugify(value);
    navigate(`/search/${slug}`);
  };
  const hideSuggestions = () => {
    setAnimeSearch(false);
  };
  const animeSearch = () => {
    setAnimeSearch(true);
    setHideTyping(true);
  };
  const typingHide = () => {
    setHideTyping(false);
  };
  return /* @__PURE__ */ jsx("section", { className: "search", children: /* @__PURE__ */ jsxs("div", { className: "search__auto--complete", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "search__input " + (animateSearch ? "search__input--focused" : ""),
        children: [
          /* @__PURE__ */ jsx(SearchIcon, { className: "search__input--icon" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "search__input--input",
              type: "text",
              value: search,
              onChange: handleSearch,
              onFocus: animeSearch,
              onMouseLeave: hideSuggestions,
              onBlur: typingHide
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "search__input--suggestionanimte " + (hideTyping ? "search__input--focused" : ""),
              children: /* @__PURE__ */ jsx(
                Typewriter,
                {
                  cursor: "|",
                  texts: searchSuggestText,
                  delay: 100,
                  infinite: true
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "search__input--keyboard" })
        ]
      }
    ),
    visible && /* @__PURE__ */ jsx("div", { className: "search__suggestions", children: /* @__PURE__ */ jsx("div", { className: "search__suggestions--list", children: suggestions2.filter((item2) => item2.toLowerCase().includes(search.toLowerCase())).map((item2, index) => /* @__PURE__ */ jsxs("div", { className: "search__suggestions--list_item", onClick: () => selectOption2(item2), children: [
      /* @__PURE__ */ jsx("div", { className: "search__suggestions--list_item__media", children: /* @__PURE__ */ jsx(SearchIcon, { className: "search__suggestions--list_item__media_icon" }) }),
      /* @__PURE__ */ jsx("span", { className: "search__suggestions--list_item__content", children: /* @__PURE__ */ jsx("div", { className: "search__suggestions--list_item__content__title", children: item2 }) })
    ] }, index)) }) })
  ] }) });
};
const AnimatedNumber = ({ targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  useEffect(() => {
    const duration = 2e3;
    const startTime = performance.now();
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const updatedNumber = Math.floor(progress * targetNumber);
      setCurrentNumber(updatedNumber);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [targetNumber]);
  return /* @__PURE__ */ jsx("span", { className: "animated-number", children: currentNumber.toLocaleString() });
};
const LocationSelector = ({ suggestions: suggestions2 }) => {
  const [showLocations, setLocations] = useState(false);
  const handleShowLocations = (handler) => {
    setLocations(handler);
  };
  const focusSearchInput = () => {
    var _a;
    const doc = document;
    if (typeof doc !== "undefined") {
      if (doc) {
        (_a = doc.querySelector(".search__input--input")) == null ? void 0 : _a.focus();
      }
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "locality-wrapper", children: /* @__PURE__ */ jsxs("div", { className: "search__input locality-wrapper__searchbox_wrapper", children: [
    /* @__PURE__ */ jsx("span", { className: "locality-wrapper__searchbox_icon", children: /* @__PURE__ */ jsx(LocationIcon, { className: "icon-ic_location" }) }),
    /* @__PURE__ */ jsx("input", { className: "locality-wrapper__searchbox", placeholder: "Search location", onFocus: () => handleShowLocations(true), onBlur: () => handleShowLocations(false) }),
    showLocations ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "suggestion-list", children: [
      /* @__PURE__ */ jsxs("div", { className: "suggestion-list_group", children: [
        /* @__PURE__ */ jsx("div", { className: "suggestion-list_group-item", children: /* @__PURE__ */ jsx("span", { className: "suggestion-list_group-item__content", children: /* @__PURE__ */ jsx("div", { className: "suggestion-list_group-item__text", children: "Use my location" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "suggestion-list_group-item", children: /* @__PURE__ */ jsx("span", { className: "suggestion-list_group-item__content", onClick: focusSearchInput, children: /* @__PURE__ */ jsx("div", { className: "suggestion-list_group-item__text", children: "Search in entire Chennai" }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "suggestion-group", children: /* @__PURE__ */ jsxs("div", { className: "suggestion-group_item", children: [
        /* @__PURE__ */ jsx("div", { className: "suggestion-group_item__media", children: /* @__PURE__ */ jsx(LocationIcon, { className: "suggestion-group_item__media_icon" }) }),
        /* @__PURE__ */ jsxs("span", { className: "suggestion-group_item__content", onClick: () => selectOption(item), children: [
          /* @__PURE__ */ jsx("div", { className: "suggestion-group_item__content__title", children: "Anna Nagar" }),
          /* @__PURE__ */ jsx("div", { className: "suggestion-group_item__content_text", children: "chennai" })
        ] })
      ] }) })
    ] }) }) : /* @__PURE__ */ jsx(Fragment, {})
  ] }) });
};
const specialty = [
  "Allergist",
  "Anaesthetics",
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Geriatrics",
  "Hematology",
  "Immunology",
  "Nephrology",
  "Neuropsychiatry",
  "Neurology",
  "Neurosurgery",
  "Oncology",
  "Ophthalmology",
  "Orthopaedics",
  "Paediatrics",
  "Pathology",
  "Pharmacology",
  "Psychiatry",
  "Public health",
  "Radiology",
  "Rheumatology",
  "Stomatology",
  "Urology",
  "Venereology"
];
const locations = [
  { "area": "Porur", "location": "chennai" },
  { "area": "Mylapore", "location": "chennai" },
  { "area": "Chromepet", "location": "chennai" },
  { "area": "Nungambakkam", "location": "chennai" },
  { "area": "T Nagar", "location": "chennai" },
  { "area": "Adyar", "location": "chennai" },
  { "area": "Greams Road", "location": "chennai" },
  { "area": "Velachery", "location": "chennai" },
  { "area": "Kilpauk", "location": "chennai" },
  { "area": "Anna Nagar", "location": "chennai" }
];
const suggestions = [
  "Accident and emergency medicine",
  "Allergist",
  "Anaesthetics",
  "Cardiology",
  "Child psychiatry",
  "Clinical biology",
  "Clinical chemistry",
  "Clinical microbiology",
  "Clinical neurophysiology",
  "Craniofacial surgery",
  "Dermatology",
  "Endocrinology",
  "Family and General Medicine",
  "Gastroenterologic surgery",
  "Gastroenterology",
  "General Practice",
  "General surgery",
  "Geriatrics",
  "Hematology",
  "Immunology",
  "Infectious diseases",
  "Internal medicine",
  "Laboratory medicine",
  "Nephrology",
  "Neuropsychiatry",
  "Neurology",
  "Neurosurgery",
  "Nuclear medicine",
  "Obstetrics and gynaecology",
  "Occupational medicine",
  "Oncology",
  "Ophthalmology",
  "Oral and maxillofacial surgery",
  "Orthopaedics",
  "Otorhinolaryngology",
  "Paediatric surgery",
  "Paediatrics",
  "Pathology",
  "Pharmacology",
  "Physical medicine and rehabilitation",
  "Plastic surgery",
  "Podiatric surgery",
  "Preventive medicine",
  "Psychiatry",
  "Public health",
  "Radiation Oncology",
  "Radiology",
  "Respiratory medicine",
  "Rheumatology",
  "Stomatology",
  "Thoracic surgery",
  "Tropical medicine",
  "Vascular surgery",
  "Urology",
  "Venereology"
];
function SearchBanner() {
  return /* @__PURE__ */ jsxs("section", { className: "search-banner", children: [
    /* @__PURE__ */ jsxs("h1", { className: "search-banner__intro-text", children: [
      /* @__PURE__ */ jsx(
        Typewriter,
        {
          cursor: " ",
          texts: specialty,
          delay: 100,
          infinite: true
        }
      ),
      " ",
      "Appointment ",
      /* @__PURE__ */ jsx("br", {}),
      "Booking in Seconds"
    ] }),
    /* @__PURE__ */ jsx("p", { className: "search-banner__intro-description", children: "Introducing the world's best search engine for Appointments." }),
    /* @__PURE__ */ jsxs("div", { className: "search-banner__fields", children: [
      /* @__PURE__ */ jsx(SearchBannerForm, { suggestions }),
      /* @__PURE__ */ jsx(LocationSelector, { suggestions: locations })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "search-banner__note", children: [
      /* @__PURE__ */ jsx(SearchIcon, { className: "search-banner__note--icon" }),
      /* @__PURE__ */ jsxs("p", { className: "search-banner__note--text", children: [
        /* @__PURE__ */ jsx(AnimatedNumber, { targetNumber: 81681 }),
        " appointments and counting ..."
      ] })
    ] })
  ] });
}
const meta = () => {
  return [
    { title: "New App" },
    { name: "description", content: "Welcome to Doctor OPT!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(SearchBanner, {}) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const action$1 = async ({ request }) => {
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(request)
    }
  });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request }) => {
  const session = await getSession(request);
  session.set("user", { id: "user-id", name: "User Name" });
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (email === "test@example.com" && password === "pass123") {
    return redirect$1("/", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  return json({ error: "Invalid email or password" });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
async function generateMapImage(lat, lng, zoom = 14) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Leaflet Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            #map {
                width: 800px;
                height: 600px;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
        <script>
            const map = L.map('map').setView([${lat}, ${lng}], ${zoom});
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);
        <\/script>
    </body>
    </html>`;
  await page.setContent(htmlContent);
  await page.setViewport({ width: 800, height: 600 });
  await new Promise((resolve) => setTimeout(resolve, 2e3));
  const screenshotBuffer = await page.screenshot();
  await browser.close();
  return Buffer.from(screenshotBuffer);
}
const loader = async ({ request }) => {
  const url = new URL(request.url);
  const lat = parseFloat(url.searchParams.get("lat") || "0");
  const lng = parseFloat(url.searchParams.get("lng") || "0");
  const zoom = parseInt(url.searchParams.get("zoom") || "14");
  if (lat === 0 || lng === 0) {
    return new Response("Missing latitude or longitude.", { status: 400 });
  }
  const mapImage = await generateMapImage(lat, lng, zoom);
  return new Response(mapImage, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600"
      // Optional caching
    }
  });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C_BMezs7.js", "imports": ["/assets/index-BG5HLTyj.js", "/assets/components-isbfS9BD.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DCVM6vTv.js", "imports": ["/assets/index-BG5HLTyj.js", "/assets/components-isbfS9BD.js", "/assets/icons-BGbLpE_i.js"], "css": ["/assets/root-OlJ1NJ7J.css"] }, "routes/search.$slug": { "id": "routes/search.$slug", "parentId": "root", "path": "search/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search._slug-JnnYwXcz.js", "imports": ["/assets/index-BG5HLTyj.js", "/assets/components-isbfS9BD.js"], "css": ["/assets/search-D5mtzoXK.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-D33yYwuE.js", "imports": ["/assets/index-BG5HLTyj.js", "/assets/icons-BGbLpE_i.js"], "css": ["/assets/_index-BrSJafRH.css"] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/signin": { "id": "routes/signin", "parentId": "root", "path": "signin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/signin-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/map": { "id": "routes/map", "parentId": "root", "path": "map", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/map-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-fa1f9060.js", "version": "fa1f9060" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false, "unstable_routeConfig": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/search.$slug": {
    id: "routes/search.$slug",
    parentId: "root",
    path: "search/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/signin": {
    id: "routes/signin",
    parentId: "root",
    path: "signin",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/map": {
    id: "routes/map",
    parentId: "root",
    path: "map",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
