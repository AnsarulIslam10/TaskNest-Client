import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="dark:bg-[#1F1A24] dark:text-white">
      <Navbar></Navbar>
      <div className="max-w-[1440px] mx-auto px-2 min-h-[calc(100vh-130px)] mb-4">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
