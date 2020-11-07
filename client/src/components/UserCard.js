import React from 'react';
import { Card } from 'react-bootstrap';

import './UserCard.css';

class UserCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
        };
    }

    render () {
        return (
            <Card className='user-card-container'>
                <Card.Img variant="top" src={this.props.avatar} width={128}/>
                <Card.Body>
                    <Card.Title className='card-title'> {this.props.title} </Card.Title>
                    
                    <Card.Text> {this.props.bio} </Card.Text>

                    <div className='hobbies-field'> 
                        {this.props.hobbies.map((h, idx) => <div key={idx} className='card-hobby'> {h} </div>)}
                    </div>
                    
                    {this.state.requestSent ? 
                        <p className='friend-notif'> Request sent! </p> : 
                        <div 
                            variant="primary"
                            className="add-friend-btn"
                            onClick={(e) => {
                                this.setState({
                                    requestSent: true
                                })
                            }}
                        >
                            Add as a friend!
                        </div>
                    }
                    
                </Card.Body>
            </Card>
        )
    }
}

export default UserCard;