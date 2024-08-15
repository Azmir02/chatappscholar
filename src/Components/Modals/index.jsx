import React, { useRef } from "react";
import { CrossIcon } from "../../svg/Cross";
import { UploadIcon } from "../../svg/Upload";

const Modals = ({ setShow }) => {
  const fileRef = useRef(null);
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#2e2e2ef0] flex items-center justify-center">
        <div className="w-[30%] rounded-md bg-white p-4 relative">
          <div>
            <h3 className="font-fontRegular text-base text-black text-center">
              Upload Photo
            </h3>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setShow(false)}
            >
              <CrossIcon />
            </div>
          </div>
          <div className="w-full border border-slate-400 rounded-md h-[300px] mt-5 p-2 box-border cursor-pointer">
            <div
              className="bg-slate-200 rounded-md w-full h-full flex items-center justify-center"
              onClick={() => fileRef.current.click()}
            >
              <div>
                <div className="flex justify-center">
                  <UploadIcon />
                </div>
                <h4>Upload your profile photo</h4>
                <input type="file" ref={fileRef} hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;
