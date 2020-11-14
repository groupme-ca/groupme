import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chat.css"
import Sidebar from '../components/SideBar';
const ChatPage = () => {
    return (
        <div className="chatpage">
            <div className="sidebar">
                <Sidebar activePage='search'/>
                <div className="chat">
                    <Avatar />
                </div>
            </div>
        </div>
        // <div className="chatpage">
        //     <div className="sidebar">
        //         <Sidebar activePage='search' />
        //         <div className="chat"> 
        //             <div className="chat_header">
        //                 <Avatar />
        //             </div>
        //         </div>
        //     </div>
        // </div>

    );
}   

export default ChatPage; 
