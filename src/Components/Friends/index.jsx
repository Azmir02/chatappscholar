import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Friends = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[700px] overflow-y-auto">
        <h1 className="font-fontBold text-black text-xl">All Friends</h1>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden"></div>
            <h3 className="font-fontRegular text-black text-lg">
              Azmir Uddin Alif
            </h3>
          </div>
          {location.pathname == "/" && (
            <button
              onClick={() => {
                navigate("/message");
              }}
              className="px-4 py-2 font-fontRegular bg-[#6CD0FB] text-white rounded-md"
            >
              Message
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
