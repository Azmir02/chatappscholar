import Lottie from "lottie-react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import registrationAnimation from "../animations/regAnimation.json";
import LoginFromComp from "../Components/Login";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-2/4 bg-white shadow-md rounded-sm p-4 flex items-center gap-x-2 justify-between">
          <div className="w-[48%]">
            <Lottie animationData={registrationAnimation} loop={true} />
          </div>
          <div className="w-[48%]">
            <LoginFromComp toast={toast} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
