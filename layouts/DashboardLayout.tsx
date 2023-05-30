import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-uf-dark text-uf-light h-screen overflow-hidden">
      <Navbar />
      <div className="h-screen flex w-full">
        <div className="w-[20%] p-5 bg-[#050505] sticky top-1">hmmmm</div>
        <div className="w-[80%] p-5 overflow-auto mb-20">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
