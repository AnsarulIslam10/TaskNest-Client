import React, { useContext } from "react";
import { BiExit } from "react-icons/bi";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-[#2ad9df] py-1">
      <div className="navbar max-w-[1440px] mx-auto px-2">
        <div className="navbar-start">
          <a className="text-3xl font-bold">
            TaskNest
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1"></ul>
        </div>
        <div className="navbar-end">
          <div className="avatar">
            <div className="ring-[#16e9aa] ring-offset-base-100 w-10 rounded-full ring mr-3">
              <img referrerPolicy="no-referrer" src={user?.photoURL} />
            </div>
          </div>
          <a
            onClick={signOutUser}
            className="btn bg-[#16e9aa] hover:bg-[#14d69c] rounded-none border-none drop-shadow-xl text-xl"
          >
            Log Out <BiExit />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
