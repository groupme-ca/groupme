import React from "react";
import "./HomePage.css";
import Sidebar from "../components/SideBar";
import HomeFeed from "../components/HomeFeed";
import { useEffect} from "react";

const HomePage = () => {
  

    return (
        <div className="homepage">
            <div className="homepage-body">
                <Sidebar activePage="home" />
                <HomeFeed />
            </div>

        </div>
    )
}

export default HomePage;