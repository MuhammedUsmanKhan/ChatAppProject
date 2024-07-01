import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import UserSection from '../../Components/UserSection/UserSection';
import MessageSection from '../../Components/MessageSection/MessageSection';

const UserChat = () => {

    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

    return (
        <div className={` text-white h-full bg-black ${isCollapsed ? "sm:ml-[15.3rem]" : "ml-[4.3rem]"}`}>
            <div className='flex   h-full '>
                <UserSection />
                <MessageSection />
            </div>
        </div>
    );
}

export default UserChat
