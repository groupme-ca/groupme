import React from "react";
import { Link } from "react-router-dom";

class ProfileButton extends React.Component {

  render() {
    return <Link to="/profile">
      <img className="profile-btn card-profile-pic" src="/static/media/vlad.58e00b26.jpg" height="32"></img>
    </Link>
  }
}

export default ProfileButton;