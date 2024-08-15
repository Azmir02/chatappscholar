import { useFormik } from "formik";
import React, { useState } from "react";
import { signIn } from "../../validation/Validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../../features/Slices/LoginSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginFromComp = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: signIn,
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        if (user.emailVerified === true) {
          setLoading(false);
          dispatch(LoggedInUser(user));
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Please verify your email", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          toast.error("Email or password is incorrect", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
      });
  };
  return (
    <>
      <div>
        <h1 className="font-fontBold text-xl mb-4">Login to your account</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            placeholder="enter your email"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-fontRegular text-red-500 text-sm mb-5">
              {formik.errors.email}
            </p>
          )}
          <input
            placeholder="enter your password"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-fontRegular text-red-500 text-sm mb-5">
              {formik.errors.password}
            </p>
          )}
          <button
            disabled={loading}
            className="bg-slate-900 text-white font-fontBold text-base rounded-md w-full py-3"
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Sign In"}
          </button>
        </form>
        <p className="font-fontRegular text-base text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link to="/registration" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginFromComp;
