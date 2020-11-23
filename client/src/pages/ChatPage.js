import React from "react";
import "./ChatPage.css";
import Chat from "../components/Chat";
import Sidebar from "../components/SideBar";
import { useEffect} from "react";

const ChatPage = () => {
  

    return (
        <div className="chatpage">
            <div className="chatpage-body">
                <Sidebar />
                <Chat />
            </div>

        </div>
    )
}

export default ChatPage;