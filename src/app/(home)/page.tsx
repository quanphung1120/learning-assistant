import Link from "next/link";
import { getSignUpUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";

export default async function Home() {
  const { user, role } = await withAuth();

  const signUpUrl = await getSignUpUrl();

  if (!user) {
    return (
      <>
        <a href="/login">Sign in</a>
        <Link href={signUpUrl}>Sign up</Link>
      </>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut({ returnTo: "/" });
      }}
    >
      <p>Welcome back{user.firstName && `, ${user.firstName}`}</p>
      <p>Your email is {user.email}</p>
      <p>Your role is {role}</p>
      <button type="submit">Sign out</button>
    </form>
  );
}
