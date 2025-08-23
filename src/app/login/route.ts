import { getRedirectUri } from "@/lib/workos-helper";
import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export async function GET() {
  const isVercelEnv = process.env.VERCEL === "1";
  const redirectTo = getRedirectUri();

  const signInUrl = await getSignInUrl({
    redirectUri: redirectTo,
  });

  console.log("ENV: " + redirectTo);
  console.log("Vercel Env: " + isVercelEnv);
  console.log("Test: " + process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI);
  console.log("Test: " + process.env.VERCEL_ENV);
  console.log("Test: " + process.env.VERCEL_PROJECT_PRODUCTION_URL);
  return redirect(signInUrl);
}
