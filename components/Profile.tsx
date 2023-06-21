import { axiosAuth } from "@/configs/axios";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { toastSuccessConfig } from "@/configs/toast";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const logout = async () => {
    const res = await axiosAuth.post("/logout");
    toast.loading("Logging out...", { id: "logout" });
    if (res.data === "OK") {
      router.push("/login");
      toast.dismiss("logout");
      toast("Logged out successfully", toastSuccessConfig);
    }
  };

  return (
    <div className="relative flex flex-col items-end">
      <div
        className="w-10 h-10 uf-gradient rounded-full p-[2px]"
        role="button"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://avatars.githubusercontent.com/u/54487532?v=4"
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div
        className={`absolute top-11 px-4 py-2 rounded-md bg-uf-dark border border-gray-800 z-10 w-56
        ${
          open
            ? "opacity-100 scale-100 transition-all pointer-events-auto"
            : "opacity-0 scale-0 transition-all pointer-events-none"
        }
        `}
      >
        <button className="flex gap-2 items-center w-full" onClick={logout}>
          <IoLogOutOutline className="text-lg" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
