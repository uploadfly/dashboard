import { useEffect, useState } from "react";
import generate from "boring-name-generator";
import { axios } from "@/configs/axios";
import toast from "react-hot-toast";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import { useRouter } from "next/router";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Head from "next/head";
import validator from "validator";
import { useFlyStore } from "@/stores/flyStore";

const Launch = () => {
  const [name, setName] = useState<string>("");
  const [projectUrl, setProjectUrl] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { setFly } = useFlyStore();

  useEffect(() => {
    setPlaceholder(generate().dashed);
  }, []);

  const createNewFly = async () => {
    try {
      const flyNameRegex = /^(?!-)(?!.*--)[a-z0-9-]{3,100}(?<!-)$/i;

      if (name && name.length < 3) {
        toast("Fly name must be at least 3 characters long", toastErrorConfig);
        return;
      }

      if (name && name.length > 100) {
        toast("Fly name must be less than 101 characters", toastErrorConfig);
        return;
      }

      if ((name && name.startsWith("-")) || name.endsWith("-")) {
        toast("Fly name cannot start or end with a dash", toastErrorConfig);
        return;
      }

      if (name && name.includes("--")) {
        toast("Fly name cannot contain consecutive dashes", toastErrorConfig);
        return;
      }

      if (name && !flyNameRegex.test(name)) {
        toast("Fly names cannot contain special characters", toastErrorConfig);
        return;
      }

      if (projectUrl && !validator.isURL(projectUrl)) {
        toast("Project URL is not valid", toastErrorConfig);
        return;
      }
      setLoading(true);

      const { data } = await axios.post("/fly/create", {
        name: name || placeholder,
        project_url: projectUrl,
      });
      setFly(data.name, data.uuid);
      toast("Your fly was created successfully", toastSuccessConfig);
      router.push(data.redirect);
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
      <Head>
        <title>Create a new fly | Uploadfly</title>
      </Head>
      <div
        className={`abosolute top-0 w-full h-full bg-uf-dark flex items-center justify-center`}
      >
        <div
          className="bg-uf-dark w-[35%] lg:flex hidden items-center justify-between flex-col h-full py-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(https://cdn.uploadfly.cloud/xCnc4L/grid-ev0zE8-UIn.png)",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <div className="w-full">
            <Link
              href={`/${user?.username}`}
              className="flex items-center font-semibold text-gray-400 ml-7"
            >
              <HiArrowNarrowLeft className="mr-3" />
              back to overview
            </Link>
          </div>
          <img src="/logo.svg" alt="" className="w-40 opacity-70" />
          <div />
        </div>
        <div className="flex-col lg:w-[65%] h-full flex relative items-center lg:justify-center lg:mt-0 mt-48">
          <img
            src="/logo.svg"
            alt=""
            className="w-20 my-5 opacity-70 lg:hidden"
          />
          <div className="mb-8">
            <h1 className="shiny-text text-3xl text-center">
              Create a new fly
            </h1>
            <p className="font-semibold text-gray-400 text-center">{`Get ready to upload files in the cloud like breeze`}</p>
          </div>

          <div className="mt-4 z-20 flex flex-col items-center justify-start w-[380px] gap-2 font-semibold">
            <div className="flex flex-col gap-3">
              <div className="">
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
              <div className="">
                <small>
                  Project URL <span className="text-gray-600">(optional)</span>{" "}
                </small>
                <input
                  type="text"
                  className="input placeholder:opacity-40"
                  placeholder={"awesome-saas.com"}
                  value={projectUrl}
                  onChange={(e) =>
                    setProjectUrl(e.target.value.toLowerCase().trim())
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 flex-col">
            <button
              className="flex gap-2 bg-uf-accent text-uf-dark rounded-md py-2 w-[380px] items-center justify-center font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
