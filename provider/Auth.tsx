import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [path, setPath] = useState<string[]>([]);
  useEffect(() => {
    const cookies = document.cookie.split(";");

    const expCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("exp=")
    );
    // Written by ChatGPT
    // Modified by @xing0x
    setPath([...path, router.asPath]);
    if (
      !expCookie &&
      router.asPath !== "/signup" &&
      router.asPath !== "/login"
    ) {
      const returnTo = encodeURIComponent(path[1]);
      router.push(`/login?returnTo=${returnTo}`);
    }
  }, [router.asPath]);

  return <>{children}</>;
};

export default AuthProvider;
