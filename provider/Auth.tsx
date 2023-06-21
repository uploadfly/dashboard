import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const currentPathname = window.location.pathname;
    const cookies = document.cookie.split(";");

    const expCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("exp=")
    );
    // Written by ChatGPT
    // Modified by @xing0x

    if (!expCookie && router.asPath !== "/signup") {
      const returnTo = encodeURIComponent(currentPathname);

      router.push(`/login?returnTo=${returnTo}`);
      return;
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
