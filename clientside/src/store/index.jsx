import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/SidebarSlice";
import userProfileSlice from "./slices/UserProfileSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        userprofile: userProfileSlice
    },
})


export default store