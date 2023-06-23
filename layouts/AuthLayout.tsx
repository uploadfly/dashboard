import FlyingThing from "@/components/FlyingThing";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { RiLoader5Fill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

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
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div className="flex flex-col relativeitems-center justify-center bg-[#050505] w-[35%] h-full">
          <div
            className="animate-breath absolute pointer-events-none flex items-center flex-wrap w-56 justify-center translate-x-[50%] top-[50%] translate-y-[-50%]
      "
          >
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#0083cb]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#a06eac]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#ffb564]"></div>
          </div>
        </div>
        <div className="flex-col w-[65%] h-full flex relative items-center justify-center">
          <div className="h-full w-full absolute magicpattern animate-opacity pointer-events-none"></div>
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
