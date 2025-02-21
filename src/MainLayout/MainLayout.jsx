import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-[1440px] mx-auto px-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
