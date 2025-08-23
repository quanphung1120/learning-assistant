export function getRedirectUri() {
  const isVercelEnv = process.env.VERCEL === "1";
  let redirectTo;

  if (isVercelEnv) {
    const envType = process.env.VERCEL_ENV;
    if (envType === "production") {
      redirectTo = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    } else {
      redirectTo = process.env.VERCEL_URL;
    }
  } else {
    redirectTo = process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI;
  }

  return redirectTo;
}
