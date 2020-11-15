import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import React from "react";
import "./Chat.css";


const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar />

                <div className="chat-headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at</p>
                </div>
                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>
            <div className="chat-body">
                <p className="chat-message">
                    <span className="chat-name">Mohammed</span>
                    This is a message
                    <span className="chat-timestamp">{new 
                    Date().toUTCString()}</span>
                </p>

                <p className="chat-receiver">
                    <span className="chat-name">Mohammed</span>
                    This is a message
                    <span className="chat-timestamp">{new 
                    Date().toUTCString()}</span>
                </p>

                <p className="chat-message">
                    <span className="chat-name">Mohammed</span>
                    This is a message
                    <span className="chat-timestamp">{new 
                    Date().toUTCString()}</span>
                </p>
                <p className="chat-message">
                    <span className="chat-name">Mohammed</span>
                    This is a message
                    <span className="chat-timestamp">{new 
                    Date().toUTCString()}</span>
                </p>
            </div>

            <div className="chat-footer">
                <form>
                    <input placeholder="Type a message"
                        type="text" />
                    <button type="submit">Send a message
                    </button>
                </form>
            </div>

        </div>
    );
}   

export default Chat; 