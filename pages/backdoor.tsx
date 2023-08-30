import { axios, axiosAuth } from "@/configs/axios";
import { useRouter } from "next/router";
import React from "react";

const Backdoor = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.post("/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Backdoor;
