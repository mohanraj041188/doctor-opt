import { json, redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // Replace this with real authentication logic
  if (email === "test@example.com" && password === "password123") {
    return redirect("/dashboard");
  }

  return json({ error: "Invalid email or password" });
};
