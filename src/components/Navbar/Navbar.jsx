import React, { useContext } from "react";
import { BiExit } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const {signOutUser} = useContext(AuthContext)
    
  return (
    <nav className="bg-[#16e9aa]">
      <div className="navbar max-w-[1440px] mx-auto px-2">
        <div className="navbar-start">
          
          <a className="text-3xl font-bold text-cyan-500">Task<span className="text-[#037754]">Nest</span></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
         
          </ul>
        </div>
        <div className="navbar-end">
          <a onClick={signOutUser} className="btn btn-accent rounded-none border-none drop-shadow-xl text-xl">Log Out <BiExit/></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
