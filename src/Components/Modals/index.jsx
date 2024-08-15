import React, { useRef, useState } from "react";
import { CrossIcon } from "../../svg/Cross";
import { UploadIcon } from "../../svg/Upload";
import ImageCropper from "../ImageCropper";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { LoggedInUser } from "../../features/Slices/LoginSlice";

const Modals = ({ setShow }) => {
  const user = useSelector((user) => user.login.loggedIn);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef();
  const fileRef = useRef(null);
  const storage = getStorage();
  const auth = getAuth();
  const dispatch = useDispatch();
  const storageRef = ref(storage, user.uid);

  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(LoggedInUser({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
            setShow(false);
          });
        });
      });
    }
  };
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
                <input
                  type="file"
                  ref={fileRef}
                  hidden
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        {image && (
          <ImageCropper
            image={image}
            setImage={setImage}
            cropperRef={cropperRef}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default Modals;
