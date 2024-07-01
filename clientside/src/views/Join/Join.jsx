import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collapseSidebar } from "../../store/slices/SidebarSlice";

import './Join.css';

export default function JoinRoom() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

    return (
        <div className={`joinOuterContainer ${isCollapsed ? "sm:ml-[15.3rem]" : "ml-[4.3rem]"}`}>
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className={'button mt-20'} type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}
