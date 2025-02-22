import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="dark:bg-[#1F1A24] dark:text-white">
      <Navbar></Navbar>
      <div className="max-w-[1440px] mx-auto px-2 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
