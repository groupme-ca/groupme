import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import frens from '../utils/UserCardUtils';

import "./FriendModal.css"
import { useState } from 'react';

import CloseIcon from "@material-ui/icons/Close";
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';

function MyVerticallyCenteredModal(props) {

    const [friends, showFriends] = useState(true); // change to Redux later
    const [reqIncoming, showIncoming] = useState(false); // change to Redux later
    const [reqPending, showPending] = useState(false); // change to Redux later

    const exampleHas = frens.hobbies.slice(0,3);
    const exampleInc = frens.courses;
    const examplePend = frens.hobbies.slice(4);

    const getSelectorStyling = (mode) => {
        if (mode === "friends") {
            return {
                color: `${friends ? "#ff914e" : "#333"}`,
                borderBottom: `${friends ? "2px solid #ff914e" : "none"}`,
                fontWeight: 700,
            }
        }

        if (mode === "reqIncoming") {
            return {
                color: `${reqIncoming ? "#ff914e" : "#333"}`,
                borderBottom: `${reqIncoming ? "2px solid #ff914e" : "none"}`,
                fontWeight: 700,
            }
        }

        if (mode === "reqPending") {
            return {
                color: `${reqPending ? "#ff914e" : "#333"}`,
                borderBottom: `${reqPending ? "2px solid #ff914e" : "none"}`,
                fontWeight: 700,
            }
        }
    }

    const renderSelectedList = (mode) => {
        if (friends) {
            return (
                <center>
                    {exampleHas.map((f) => (
                        <div className="friend-list-entry"> 
                            <img src={f.avatar} height="48" width="48" className="friend-list-icon" />
                            
                            <div className="friend-list-info">
                                <div> <b> {f.name} </b> </div>
                                <div> {f.bio} </div>
                            </div>
                        </div>
                    ))}
                </center>
            );
        }

        
        else if (reqIncoming) {
            return (
                <center>
                    {exampleInc.map((f) => (
                        <div className="friend-list-entry"> 
                            <img src={f.avatar} height="48" width="48" className="friend-list-icon" />
                            
                            <div className="friend-list-info">
                                <div> <b> {f.name} </b> </div>
                                <div> {f.bio} </div>
                            </div>

                            <div className="friend-accept-btn"> <CheckIcon /> </div>
                            <div className="friend-cancel-btn"> <BlockIcon /> </div>
                        </div>
                    ))}
                </center>
            );
        }
        
        else if (reqPending) {
            return (
                <center>
                    {examplePend.map((f) => (
                        <div className="friend-list-entry"> 
                            <img src={f.avatar} height="48" width="48" className="friend-list-icon" />
                            
                            <div className="friend-list-info">
                                <div> <b> {f.name} </b> </div>
                                <div> {f.bio} </div>
                            </div>
                            
                            <div className="friend-cancel-btn"> <BlockIcon /> </div>
                        </div>
                    ))}
                </center>
            );
        }
    }

    return (
        <div 
            className="modal-bg"
            style={(!props.show) ? {display: 'none'} : {display: 'block'}}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-container"
                centered
            >
                <Modal.Header className="friend-modal-head">
                    <CloseIcon 
                        className="modal-close-btn" 
                        onClick={() => {
                            props.onHide();
                        }}
                    /> 
                <div className="modal-selectors"> 
                    <div 
                        style={getSelectorStyling("friends")}
                        onClick={() => {
                            showIncoming(false);
                            showFriends(true);
                            showPending(false);
                        }}
                    > 
                        Friends 
                    </div> 
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <div 
                        style={getSelectorStyling("reqIncoming")}
                        onClick={() => {
                            showIncoming(true);
                            showFriends(false);
                            showPending(false);
                        }}
                    > 
                        Requests 
                    </div>
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <div 
                        style={getSelectorStyling("reqPending")}
                        onClick={() => {
                            showIncoming(false);
                            showFriends(false);
                            showPending(true);
                        }}
                    > 
                        Pending 
                    </div>

                </div>
                </Modal.Header>
                <Modal.Body className="list-body">
                    {renderSelectedList(friends, reqIncoming, reqPending)}
                </Modal.Body>
            </Modal>
    </div>
    );
}

export default MyVerticallyCenteredModal;