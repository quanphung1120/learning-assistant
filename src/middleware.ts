import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export function getRedirectUri() {
  const redirectPathname = "/callback";
  const isVercelEnv = process.env.VERCEL === "1";
  let redirectTo;

  if (isVercelEnv) {
    const envType = process.env.VERCEL_ENV;
    if (envType === "production") {
      redirectTo = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (envType === "preview") {
      redirectTo = `https://${process.env.VERCEL_URL}`;
    }
  } else {
    redirectTo = "http://localhost:3000";
  }

  const result = new URL(redirectPathname, redirectTo);
  console.log("Redirect URI: " + result.href);
  return result;
}

export default authkitMiddleware({
  redirectUri: getRedirectUri().href,
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ["/", "/callback", "/login"],
  },
  debug: process.env.VERCEL_ENV !== "production",
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
