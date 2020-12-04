import React from "react";
import "./HomeFeed.css";
import { connect } from "react-redux";
import { useState, useEffect } from "react"



const HomeFeed = (state) => {    

    var feed = [];
    var i;
    var msgs = Array.from(state.messages.messages);
    msgs.reverse();
    var chts = Array.from(state.chats.chat);
    

    //remove the if statement if we want to see messages sent by us
    return (
        <div className="home">
            <div className="home-body" >
                {msgs.map((message) => {
                    if (message.sender !== state.auth.user.name) {
                        return (
                            <p className="home-message">
                                <span className="home-name">{message.sender}  
                                {chts.find(e => e._id === message.chatId).name !== '' ? 
                                 ' from ' + chts.find(e => e._id === message.chatId).name 
                                 : ''}</span>
                                {message.content}
                                <span className="home-timestamp">{message.timestamp}</span>
                            </p>

                        )
                    }
                   
                })}
            </div>
        </div>
    );
}   

// This is the current state in the store.
const mapStateToProps = (state, path) => ({
	auth: state.auth,
	error: state.error,
    chats: state.chats,
    messages: state.messages,
    props: path
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, {})(HomeFeed);
