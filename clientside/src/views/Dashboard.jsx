import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { collapseSidebar } from "../store/slices/SidebarSlice";
// import MyContext from '../Components/Drawer/Sidebar';

const Dashboard = ({ Si }) => {


  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // const { expanded } = useContext(SidebarContext)

  // console.log(expanded)

  return (
    
    
    <div className={`border text-black ${isCollapsed ? "sm:ml-[15.3rem]" : "ml-[4.3rem]"}`}>
      kkkk
    </div>
  )
}

export default Dashboard
