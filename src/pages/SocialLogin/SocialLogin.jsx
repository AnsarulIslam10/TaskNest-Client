import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPulic";
import { AuthContext } from "../../providers/AuthProvider";

import { useTypewriter } from "react-simple-typewriter";
const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const userInfo = {
          userId: result.user?.uid,
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          navigate("/");
          toast.success("Signed In Successfully");
        });
      })
      .catch((err) => console.log(err));
  };

  const [text1] = useTypewriter({
    words: ["Organize.", "Prioritize.", "Conquer."],
    loop: true,
  });
  return (
    <div className="bg-gradient-to-tr from-cyan-300 to-sky-500 h-[100vh]">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold mb-2">Welcome to</h1>
          <h1 className="text-6xl font-bold mb-4">TaskNest</h1>
          <p className="text-3xl mb-6">‎{text1}</p>
          <a
            onClick={handleGoogleSignIn}
            className="btn btn-wide btn-lg text-2xl uppercase bg-gradient-to-tr from-sky-500 to-cyan-300 border-none drop-shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Sign In With
            <FcGoogle className="text-3xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
