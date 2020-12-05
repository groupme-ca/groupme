import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import Select from 'react-select';

import frens from '../utils/UserCardUtils';

import "./CreateGroupModal.css";
import { useState } from 'react';

import CloseIcon from "@material-ui/icons/Close";
import { createChat } from '../actions/chatActions';
import { getUsers } from '../actions/userActions';


const CreateGroupModal = (state) => {
    const users = Array.from(state.user.users);
    const me = {
        uid: state.auth.user._id,
        name: state.auth.user.name
    };
    const [grpName, setGrpName] = useState('');
    const [participants, setParticipants] = useState([me]);
    
    const friends = [];
    Array.from(state.auth.user.friends).forEach((f) => {
        friends.push({value: f.uid,  label: f.name});
    })
    console.log(friends, 'f', participants, 'p');

    const handleOnSelect = (f) => {
        const newf = [];
        if(f !== null){
            f.forEach(friend => {
                newf.push({uid:friend.value, name: friend.label});
            })
            setParticipants(newf.concat(me));
        }else{
            setParticipants([me]);
        };
    }

    const createGroup = async (e) => {
        e.preventDefault();
        const newChat = {
            participants: participants,
            name: grpName
        }
        const prt = [];
        const updated_prt = [];
        participants.forEach(p => {
            prt.push(users.find(u => p.uid === u._id));            
        });
        prt.forEach(usr => {
            updated_prt.push({id: usr._id, ChatIds: usr.ChatIds});            
        })
        console.log('prt', updated_prt);
        await state.createChat(newChat, updated_prt);
        state.getUsers();
        setGrpName('');

        state.onHide();
        
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
                            setGrpName('');
                            state.onHide();
                        }}
                    /> 
                <div className="modal-selectors"> 
                    <div> 
                        Create a room
                    </div> 

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                </Modal.Header>
                <Modal.Body className="list-body">
                    <center>      
                        <div className="friend-list-entry"> 
                            <form>
                                <input value={grpName} onChange={e => setGrpName(e.target.value)}  placeholder="Room Name"
                                    type="text" />
                                <div>
                                    <Select 
                                        isMulti
                                        className="filter-container"
                                        options={friends}  
                                        onChange={handleOnSelect}
                                        placeholder="Add members to the room"
                                    />
                                </div>
                                <button onClick={createGroup} type="submit">Create Room
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
    user: state.user,
	error: state.error,
    chats: state.chats,
    messages: state.messages,
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter.
export default connect(mapStateToProps, { createChat, getUsers })(CreateGroupModal);