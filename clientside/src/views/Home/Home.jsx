import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { collapseSidebar } from "../../store/slices/SidebarSlice";

const Home = () => {

    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

    return (
        <div className={` ${isCollapsed ? "sm:ml-[15.3rem]" : "ml-[4.3rem]"}`}>
            Welcome to Our Chat App Please SignUp to Proceed further with seamless fun.
        </div>
    )
}

export default Home
