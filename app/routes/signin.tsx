import { json, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/utlis/session.server";

export const action = async ({ request }: ActionArgs ) => {
  const session = await getSession(request);
  session.set("user", { id: "user-id", name: "User Name" });
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Replace this with real authentication logic
  if (email === "test@example.com" && password === "pass123") {
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({ error: "Invalid email or password" });
};
