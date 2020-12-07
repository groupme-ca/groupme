import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from "react-redux";

import CloseIcon from '@material-ui/icons/Close';

import { getUsers } from '../actions/userActions';
import { loadUser } from '../actions/authActions';

import './UserModal.css';

const UserModal = (props) => {
    const [show, setShow] = useState(true);

    const renderFriendStatus = (name) => {

        if (!props.auth.user) return;

        const has = props.auth.user.friends.find(f => props.title === f.name);
        if (has) {
            return `You and ${name} are now friends`;
        }

        const inc = props.auth.user.friendRequestsRec.find(f => props.title === f.name);
        if (inc) {
            return `${name} already wants to be your friend`;
        }

        const req = props.auth.user.friendRequestsSent.find(f => props.title === f.name);
        if (req) {
            return "Request sent!";
        }

        else return false;
    }

    return (  
        <div 
            className="modal-bg"
            style={(!props.showModal) ? {display: 'none'} : {display: 'block'}}
        >
            <Modal
                show={props.showModal}
                onHide={() => setShow(false)}
                className="modal-container"
            >                
                <Modal.Header className="modal-head">
                    <CloseIcon 
                        className="modal-close-btn" 
                        onClick={() => {
                            props.hideModal();
                        }}
                    /> 
                    <img src={props.picture} className="modal-profile-pic" />
                    <div className="modal-info">
                        <h2 className="modal-title"> {props.title} </h2>
                        <p className="modal-bio"> 
                            {props.bio}
                        </p>
                    </div>
                </Modal.Header>
                <div className="tags-container">
                    <div className="tags-wrapper"> 
                        <h3> Courses </h3>
                        <div className="tags">
                            {props.courses.map((c, idx) => (
                                <p className="tag" key={idx}>
                                    {c}
                                </p>
                            ))} 
                        </div>
                    </div>
                    
                    <div className="tags-wrapper"> 
                        <h3> Hobbies </h3>
                        <div className="tags">
                            {props.hobbies.map((h, idx) => (
                                <p className="tag" key={idx}>
                                    {h}
                                </p>
                            ))} 
                        </div>
                    </div>
                </div>
                {renderFriendStatus(props.title) ? (
                    <div className="modal-status"> {renderFriendStatus(props.title)} </div>
                ) : (
                    <div className="btn primary modal-btn">
                        Add friend
                    </div> 
                )}
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
export default connect(mapStateToProps, { getUsers, loadUser })(UserModal);