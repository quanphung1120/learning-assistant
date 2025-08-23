import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  const redirectTo =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}/callback`
      : "http://localhost:3000/callback";

  const signInUrl = await getSignInUrl({
    redirectUri: redirectTo,
  });

  return redirect(signInUrl);
}
