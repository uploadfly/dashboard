import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useState } from "react";

const Files = () => {
  const [showFileInfo, setShowFileInfo] = useState(false);
  return (
    <DashboardLayout>
      <div className="bg-blue-500 h-screen flex">
        <div className="h-full bg-red-400 w-[35%]"></div>
        <div className="h-full bg-purple-500  w-full"></div>
        <div
          className={`transition-all duration-500 ease-in-out h-full bg-green-500 ${
            showFileInfo ? "w-[45%]" : "w-0"
          }`}
        ></div>
      </div>
    </DashboardLayout>
  );
};

export default Files;
