import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img
        className="w-[900px]"
        src="https://i.ibb.co.com/hfvfsXf/Pngtree-error-404-page-not-found-5768129.png"
        alt=""
      />
      <Link
        to={"/"}
        className="btn btn-md relative sm:-top-20 md:-top-40 bg-[#16e9aa] hover:bg-[#14d69c] rounded-none text-xl"
      >
        <FaArrowLeft /> Go Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
