import FlyingThing from "@/components/FlyingThing";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Head from "next/head";

const AuthLayout = ({
  children,
  text,
  type = "login",
  isOtpInputVisible = false,
}: {
  children: ReactNode;
  text: string;
  type?: "login" | "signup";
  isOtpInputVisible?: boolean;
}) => {
  const [hide, setHide] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    e.key === "Enter" && setHide(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (router.asPath === "/login?status=failed") {
      setHide(true);
      toast.error("Login failed");
    }
  }, []);

  useEffect(() => {
    const handleKeyDown: EventListener = (e: Event) => {
      handleKeyPress(e as unknown as KeyboardEvent);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    //Written by ChatGPT
    //Modified by @xing0x
  }, []);

  const loginWithGithub = async () => {
    setLoading(true);
    window.open(`${process.env.NEXT_PUBLIC_AUTH_URL}/github`, "_self");
  };

  return (
    <div className="bg-uf-dark relative h-screen text-uf-light overflow-x-hidden">
      <Head>
        <title>{type === "login" ? "Login" : "Signup"} | Uploadfly</title>
      </Head>
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div
          className="w-[35%] h-full flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/grid-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <img src="/logo.svg" alt="" className="w-40 opacity-70" />
        </div>
        <div className="flex-col w-[65%] h-full bg-uf-dark flex relative items-center justify-center">
          <div className="h-full w-full absolute animate-opacity pointer-events-none"></div>
          <div className="mb-8">
            <h1 className="shiny-text text-3xl">{text}</h1>
            <p className="text-center font-semibold text-gray-400">{`Let's fly`}</p>
          </div>
          {children}
          {!isOtpInputVisible && (
            <>
              <div className="mt-4 flex justify-start w-[380px] gap-2 font-semibold">
                <p>
                  {type === "login"
                    ? "New to Uploadfly?"
                    : "Already have an account?"}
                </p>
                <Link href={type === "login" ? "/signup" : "/login"}>
                  {type === "login" ? "Signup" : "Login"}
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-4 flex-col">
                <p>or</p>
                <button
                  className="flex gap-2 bg-uf-light text-uf-dark rounded-md py-2 w-[380px] items-center justify-center font-bold hover:scale-105 transition-all"
                  onClick={loginWithGithub}
                >
                  {loading ? (
                    <RiLoader5Fill className="animate-spin text-2xl" />
                  ) : (
                    <>
                      <SiGithub className="text-xl" />
                      Continue with GitHub
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/**Flying thing */}
      <FlyingThing hide={hide} setHide={() => setHide(true)} />
    </div>
  );
};

export default AuthLayout;
