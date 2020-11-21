import React from 'react';
import Pusher from 'pusher-js';
import { getChats } from "../actions/chatActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, useEffect } from "react"

const LiveChat = (state) => {
    // TODO: figure out how to unscubscribe later

        useEffect(() => {
            const pusher = new Pusher('d386d4bf8093a108cca2', {
                cluster: 'us2'
            });
            if (state.auth.token !== null){
                state.auth.user.ChatIds.forEach(id => {
                    const channel = pusher.subscribe(id);
                    channel.bind('updated', (data) => {
                        state.getChats(data);
                    });

                    return() => {
                        channel.unbind_all();
                        channel.unsubscribe();
                    };                
                });    
            };
        }, [state.chats]); 
    
    return (null);
}

    /* 
    currently when a message is sent, user is allerted and a new chat is created. need to add new behaviour in the message backend
    so when a message is sent to a specific chat id, it is appended to the end (maybe find and update with a new chat that 
    includes the latest message). Then all the user has to do is request that specific chat id again so need to make a redux action that 
    only gets 1 id (or just add the for loop in sign in instead of in the action).    
    Since i switched to update rather than insert, i have to listen to the chat ids channel instead of listening to my own id
    */
        

// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
	chats: state.chats
});

export default connect(mapStateToProps, { getChats })(LiveChat);
