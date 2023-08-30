import { axiosAuth } from "@/configs/axios";
import { useRouter } from "next/router";
import React from "react";

const Backdoor = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axiosAuth.post("/logout");
      router.reload();
    } catch (error) {
      console.log(error);
      return;
    }
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Backdoor;
