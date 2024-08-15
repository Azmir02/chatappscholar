import React from "react";
import { CrossIcon } from "../../svg/Cross";
import { Cropper } from "react-cropper";

const ImageCropper = ({ image, setImage, cropperRef, getCropData }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div className="w-[30%] rounded-md bg-white p-4 relative">
          <div>
            <h3 className="font-fontRegular text-base text-black text-center">
              Upload Photo
            </h3>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setImage()}
            >
              <CrossIcon />
            </div>
          </div>
          <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div>
          <div className="mt-5">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
          <button
            className="bg-[#6CD0FB] text-white font-fontBold w-full py-2 rounded-md mt-3"
            onClick={getCropData}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
