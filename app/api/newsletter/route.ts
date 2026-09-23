import { addNewsletterSignup } from "@/lib/newsletter";
import { RateLimitError } from "@/lib/rate-limit";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = String(body.email || "");
  } catch {
    return Response.json({ ok: false, message: "Enter a valid email." }, { status: 400 });
  }
  try {
    await addNewsletterSignup(email);
    return Response.json({ ok: true, message: "You are signed up." });
  } catch (error) {
    const message =
      error instanceof RateLimitError ||
      (error instanceof Error && error.message === "Enter a valid email.")
        ? error.message
        : "Could not save that email.";
    return Response.json({ ok: false, message }, { status: 400 });
  }
}
