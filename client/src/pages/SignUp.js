import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';

import options from '../utils/SignUpOptions';
import logo from '../assets/img/logo.svg';

// The following imports are for redux
// This connects the frontend to backend.
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';


const formFields = ['Name', 'Username', 'Email', 'Password'];

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 1,
            error: false,
            Name: '',
            Username: '',
            Password: '',
            Email: ''
        };
    }

    componentDidMount(props) {
        this.setState({
            stage: 1,
            nextPage: '/signup',
        });
    }

    handleOnNext = (e) => {    
        const err = this.authenticate();
        if (!err && this.state.stage == 1) {
            this.setState({
                stage: 2,
                nextPage: '/welcome'
            });
        }
        
        else if(this.state.stage == 2){
            // construct the data that we want to add into db
            const newUser = {
                "name": this.state.Name,
                "username": this.state.Username,
                "email": this.state.Email,
                "password": this.state.Password
            };
            // console.log(newUser);
            // Call the action to add the user.
            this.props.addUser(newUser);
        }
    };
    /**
     * For now, this will just check for hardcoded values
     */
    authenticate() {
        /**
         * We input our placeholder logic for now
         * TODO: Send a message for incorrect info/info which is already in the 
         * database.
         * 
         *      Strip spaces on the right for each field. 
         *      Check for valid email (@mail.utoronto.ca)
         *      
         */
        if (
            1
            // this.state.Name ===  'a user' &&           
            // this.state.Username === 'auser' && 
            // this.state.Password === 'apassword' &&
            // this.state.Email === 'auser@mail.utoronto.ca'
        ) {
            this.setState({ error: false });
            return 0;
        } else {
            this.setState({ error: true });
            // return 1;
            return 0;
        }
    } 

    formEvent = ({ target }) => {
        this.setState({ 
            [target.name]: target.value
        });
    };

    render() {
        return (
            <div>
                <Link to='/'> 
                    <img id='logo' src={logo} width={128} /> 
                </Link>
                <center>
                    <h1 className='form-title'>
                        Create your profile
                    </h1>
                    <pre> {this.state.error ? "Error occurred" : ""}</pre>
                </center>

                {this.state.stage === 1 ? (
                    <div>
                        <div className='form-container'>
                            <div className='PLACEHOLDER-img'> 
                                FEATURE COMING SOON
                            </div>
                            <div className='form-fields'>
                                {formFields.map((field)  => (
                                        <div className='form-row'>
                                            <label> {field} * </label>
                                            {/* This hooks up the form to the state variable
                                                also, if it's a password field it gives it the type password*/}
                                            <input 
                                                type={field === "Password" ? "password" : "" } 
                                                name={field} 
                                                onChange={this.formEvent} 
                                            /> 
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className='bio-container'>
                            <label> Bio </label>
                            <textarea />
                        </div>

                        <br/><br/><br/><br/>

                    </div>
                ) : (
                    <div className="select-wrapper">
                        <div>
                            <p className='select-header'> Hobbies </p>
                            <Select 
                                isMulti
                                className="select-container"
                                options={options.hobbies} 
                            />
                        </div>
                        <div>
                            <p className='select-header'> Courses </p>
                            <Select 
                                isMulti
                                className="select-container"
                                options={options.courses} 
                            />
                        </div>
                    </div>
                )}
                <Link to={this.state.nextPage} className="btn primary md form-submit" onClick={this.handleOnNext}>
                    {this.state.stage === 1 ? "Next" : "Sign Up"}
                </Link>

            </div>
        );
    }
}

// This is the current user, that we get from redux state.
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

// This connect thing is required to make redux work, we add the different props that we need
// in the second parameter. 
export default connect(mapStateToProps, { addUser })(SignUpPage);
