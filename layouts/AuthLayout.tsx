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
  question,
  hideFlyingThing = false,
  pageName,
}: {
  children: ReactNode;
  text: string;
  type?: "login" | "signup" | "forgot" | "reset";
  isOtpInputVisible?: boolean;
  question?: {
    title: string;
    route: string;
    text: string;
  };
  hideFlyingThing?: boolean;
  pageName: string;
}) => {
  const [hide, setHide] = useState<boolean>(hideFlyingThing);
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
        <title>{pageName} | Uploadfly</title>
      </Head>
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div
          className="w-[35%] h-full lg:flex hidden items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(/grid-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <img src="/logo.svg" alt="" className="w-40 opacity-70" />
        </div>
        <div className="flex-col lg:w-[65%] h-full bg-uf-dark flex relative items-center lg:justify-center lg:mt-0 mt-48">
          <div className="h-full w-full absolute animate-opacity pointer-events-none"></div>
          <div className="mb-8 flex flex-col items-center">
            <img
              src="/logo.svg"
              alt=""
              className="w-20 my-5 opacity-70 lg:hidden"
            />
            <h1 className="shiny-text text-3xl">{text}</h1>
            {type === "signup" && (
              <p className="text-center font-semibold text-gray-400">{`Let's fly`}</p>
            )}
          </div>
          {children}

          {type === "login" && (
            <Link
              href={"/forgot-password"}
              className="text-left w-[380px] mx-auto mt-3 font-semibold text-sm hover:text-uf-accent transition-colors"
            >
              Forgot password?
            </Link>
          )}
          {!isOtpInputVisible && (
            <>
              {type !== "reset" && (
                <div className="mt-4 flex justify-start w-[380px] gap-2 font-semibold">
                  <p>{question?.title}</p>
                  <Link href={question?.route || ""}>{question?.text}</Link>
                </div>
              )}

              {type === "login" ||
                (type === "signup" && (
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
                ))}
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
