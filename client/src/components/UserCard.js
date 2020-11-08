import React from 'react';
import { Card } from 'react-bootstrap';

import './UserCard.css';

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
            profileView: false,
        };
    }

    componentDidMount(props) {
        const {profileView, requestSent} = this.state;
        if (profileView || requestSent) {
            this.setState({
                requestSent: false,
                profileView: false,
            });
        }
    } 

    render () {
        return (
            <Card className='user-card-container'>
                <Card.Img variant="top" src={this.props.avatar} width={128}/>
                <Card.Body>
                    <Card.Title className='card-title'> {this.props.title} </Card.Title>
                    
                    <Card.Text> {this.props.bio} </Card.Text>

                    <div className='hobbies-field'> 
                        {this.props.tags.map((h, idx) => <div key={idx} className='card-hobby'> {h} </div>)}
                    </div>
                    
                    {<div className='card-buttons'>
                        
                        {this.state.requestSent ? 
                            <p className='friend-notif'> Request sent! </p> : 
                            <div 
                                className="btn primary xs"
                                onClick={(e) => {
                                    this.setState({
                                        requestSent: true
                                    })
                                }}
                            >
                                Add friend
                            </div>
                        }
                            <div 
                            className="btn secondary xs"
                            onClick={(e) => {
                                this.setState({
                                    profileView: true
                                })
                            }}
                        >
                            View profile
                        </div>
                    </div>}
                </Card.Body>
            </Card>
        )
    }
}

export default UserCard;