import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import CloseIcon from '@material-ui/icons/Close';

import './UserModal.css';

const UserModal = (props) => {
    const [show, setShow] = useState(true);
  
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

                <div class="btn primary modal-btn">
                    Add friend
                </div> 
            </Modal>
        </div>
    );
}

export default UserModal;