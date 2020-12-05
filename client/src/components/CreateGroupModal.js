import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";

import frens from '../utils/UserCardUtils';

import "./CreateGroupModal.css";
import { useState } from 'react';

import CloseIcon from "@material-ui/icons/Close";
import { createChat } from '../actions/chatActions'



const CreateGroupModal = (state) => {

    const [grpName, setGrpName] = useState('');
    const [participants, setParticipants] = useState([{
        uid: state.auth.user._id,
        name: state.auth.user.name
    }]);



    const createGroup = () => {
        const newChat = {
            participants: participants,
            name: grpName
        }
        state.createChat(newChat);
    }

    return (

        <div 
            className="modal-bg"
            style={(!state.show) ? {display: 'none'} : {display: 'block'}}
        >
            <Modal
                {...state}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-container"
                centered
            >
                <Modal.Header className="friend-modal-head">
                    <CloseIcon 
                        className="modal-close-btn" 
                        onClick={() => {
                            state.onHide();
                        }}
                    /> 
                <div className="modal-selectors"> 
                    <div> 
                        Create a group
                    </div> 

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                </Modal.Header>
                <Modal.Body className="list-body">
                    <center>      
                        <div className="friend-list-entry"> 
                            <form>
                                <input value={grpName} onChange={e => setGrpName(e.target.value)}  placeholder="Group Name"
                                    type="text" />
                                <button type="submit">Create Group
                                </button>
                            </form>

                        </div>
                    </center>              
                </Modal.Body>
            </Modal>
    </div>
        
    );
}


// This is the current state in the store.
const mapStateToProps = (state, path) => ({
	auth: state.auth,
	error: state.error,
    chats: state.chats,
    messages: state.messages,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { createChat })(CreateGroupModal);