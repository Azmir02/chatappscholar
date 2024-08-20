import React from "react";

const FriendRequest = () => {
  return (
    <>
      <div className="shadow-md rounded-md bg-white p-5 h-[700px] overflow-y-auto">
        <h1 className="font-fontBold text-black text-xl">Friend Request</h1>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 rounded-full bg-purple-600 overflow-hidden"></div>
            <h3 className="font-fontRegular text-black text-lg">
              Azmir Uddin Alif
            </h3>
          </div>
          <div className="flex items-center gap-x-2">
            <button className="px-4 py-2 font-fontRegular bg-[#6CD0FB] text-white rounded-md">
              Accept
            </button>
            <button className="px-4 py-2 font-fontRegular bg-[#D34A4A] text-white rounded-md">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
