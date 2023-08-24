import { axiosAuth } from "@/configs/axios";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { toastErrorConfig, toastSuccessConfig } from "@/configs/toast";
import { useUserStore } from "@/stores/userStore";
import { LuSettings } from "react-icons/lu";
import Link from "next/link";

const Profile = () => {
  const [focused, setFocused] = useState(false); // Add focused state
  const { user } = useUserStore();
  const router = useRouter();

  const logout = async () => {
    try {
      await axiosAuth.post("/logout");
      toast.loading("Logging out...", { id: "logout" });
      router.push("/login");
      toast.dismiss("logout");
      toast("Logged out successfully", toastSuccessConfig);
    } catch (error) {
      toast.dismiss("logout");
      toast.error("Failed to logout", toastErrorConfig);
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col items-end">
      <div
        className="w-12 h-12 border-2 border-uf-accent/70 hover:border-uf-accent transition-colors rounded-full p-[2px]"
        role="button"
        onClick={() => setFocused(!focused)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        tabIndex={0}
      >
        <img
          src={`https://avatars.uploadfly.cloud/6.x/bottts/png?seed=${user?.username}`}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div
        className={`absolute top-11 px-1 flex flex-col items-start gap-2 py-2 rounded-md bg-uf-dark border border-gray-800 z-10 w-56
        ${
          focused
            ? "opacity-100 scale-100 transition-all pointer-events-auto"
            : "opacity-0 scale-0 transition-all pointer-events-none"
        }
        `}
      >
        <Link
          href={"/settings"}
          className="flex gap-2 items-center w-full hover:bg-white/10 p-1 rounded-md transition-colors"
          onClick={logout}
        >
          <LuSettings className="text-lg" /> Settings
        </Link>
        <button
          className="flex gap-2 items-center w-full hover:bg-white/10 p-1 rounded-md transition-colors"
          onClick={logout}
        >
          <IoLogOutOutline className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
