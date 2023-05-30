import { useEffect, useState } from "react";
import generate from "boring-name-generator";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";

const Launch = () => {
  const [name, setName] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setPlaceholder(generate().dashed);
  }, []);

  const createNewFly = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/fly/create", {
        name: name || placeholder,
      });
      toast("Your fly was created successfully", toastSuccessConfig);
      router.push(res.data.redirect);
    } catch (error: any) {
      setLoading(false);
      toast(
        error?.response?.data?.message ||
          "Holy *#it! something went wrong. Try again",
        toastErrorConfig
      );
    }
  };

  const { user } = useUserStore();
  return (
    <div className="bg-uf-dark relative h-screen text-uf-light overflow-x-hidden">
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div className="bg-[#050505] w-[35%] h-full">
          <div
            className="animate-breath absolute pointer-events-none flex items-center flex-wrap w-56 justify-center translate-x-[50%] top-[50%] translate-y-[-50%]
  "
          >
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#0083cb]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#a06eac]"></div>
            <div className="h-28 w-28 rounded-full blur-2xl bg-[#ffb564]"></div>
          </div>
          <div className="py-5 px-8">
            <Link
              href={`/${user?.username}`}
              className="flex  items-center font-semibold text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 font-bold mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              back to dashboard
            </Link>
          </div>
        </div>
        <div className="flex-col w-[65%] h-full flex relative items-center justify-center">
          <div className="h-full w-full absolute magicpattern animate-opacity pointer-events-none z-10"></div>
          <div className="mb-8">
            <h1 className="shiny-text text-3xl">Create a new fly</h1>
            <p className="font-semibold text-gray-400">{`Get ready to upload files in the cloud like breeze`}</p>
          </div>

          <div className="mt-4 z-20 flex flex-col justify-start w-[380px] gap-2 font-semibold">
            <div className="flex flex-col gap-1">
              <small>Give your fly a name</small>
              <input
                type="text"
                className="input placeholder:opacity-40"
                placeholder={placeholder}
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value.toLowerCase().trim().replaceAll(" ", "-")
                  )
                }
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 flex-col">
            <button
              className="flex gap-2 bg-uf-light text-uf-dark rounded-md py-2 w-[380px] items-center justify-center font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={createNewFly}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${loading && "animate-spin"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
              </svg>
              Launch{loading && "ing"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
