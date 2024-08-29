import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./Slices/LoginSlice";
import ActiveSingleSlice from "./Slices/ActiveSingleSlice";

const store = configureStore({
    reducer: {
        login: LoginSlice,
        active: ActiveSingleSlice
    }
})

export default store