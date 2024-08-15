import React, { useState } from "react";
import { FriendsIcon } from "../../svg/Friends";
import { MessageIcon } from "../../svg/Message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { LogeOutUser } from "../../features/Slices/LoginSlice";
import { CameraIcon } from "../../svg/Camera";
import { createPortal } from "react-dom";
import Modals from "../Modals";
import avatarImage from "../../assets/avatar.jpg";

const Navbar = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        localStorage.removeItem("user");
        dispatch(LogeOutUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-between py-3 bg-slate-900 px-7">
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full  overflow-hidden">
              <img
                src={user.photoURL || avatarImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setShow(true)}
            >
              <CameraIcon />
            </div>
          </div>
          <div>
            <span className="font-fontRegular text-white">
              {user.displayName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Link
            to="/"
            className={`${
              location.pathname == "/"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white"
            } w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <FriendsIcon />
          </Link>
          <Link
            to="/message"
            className={`${
              location.pathname == "/message"
                ? "text-white bg-[#6CD0FB]"
                : "text-[#292D32] bg-white"
            } w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <MessageIcon />
          </Link>
        </div>
        <div>
          <button
            className="bg-[#6CD0FB] px-4 py-2 rounded-md font-fontBold text-sm text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {show && createPortal(<Modals setShow={setShow} />, document.body)}
    </>
  );
};

export default Navbar;
