import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined, Today } from "@material-ui/icons";
import { sendMessage } from "../actions/chatActions";
import React from "react";
import "./Chat.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react"



const Chat = (state) => {
    const id = window.location.pathname.slice(6);
    const [input, setInput] = useState("");
    // useEffect(() => {
    //     console.log(window.location.pathname);
    // }, [state.chats]);
    var curChat;
    state.chats.chat.forEach(cht => {
        if (cht._id === id) {
            curChat = cht;
        }
    });
    const onClickHandler = (e) => {
        e.preventDefault();
        var date = new Date();
        var time = date.getHours() + ":" + date.getMinutes();

        const newMessages = curChat.messages.concat([{
        "sender": state.auth.user.name,
        "content": input,
        "timestamp": time
        }]);

        const newChat = {
        "_id": curChat._id,
        "messages": newMessages 
        }

        state.sendMessage(newChat)

    };
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
                {curChat.messages.map((message) => (
                    <p className={message.sender === state.auth.user.name ? "chat-message" : "chat-receiver"}>
                        <span className="chat-name">{message.sender}</span>
                        {message.content}
                        <span className="chat-timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat-footer">
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"
                        type="text" />
                    <button onClick={onClickHandler} type="submit">Send a message
                    </button>
                </form>
            </div>

        </div>
    );
}   

// This is the current state in the store.
const mapStateToProps = (state, path) => ({
	auth: state.auth,
	error: state.error,
    chats: state.chats,
    props: path
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { sendMessage })(Chat);
