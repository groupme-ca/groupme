import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import RecommendationPage from "./pages/Recommendations";
import ProfilePage from "./pages/Profile";
import ChatPage from './pages/ChatPage';
import { Provider } from "react-redux";
import store from "./store";
import { Component } from "react";
import LiveChat from "./utils/LiveChat"
<<<<<<< HEAD
import ChatPage from './pages/Chat';
=======
>>>>>>> 683e846 (added the updated files from local chat repo)


class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" exact render={() => <LandingPage />} />
					<Route path="/signup" exact render={() => <SignUpPage />} />
					<Route path="/signin" exact render={() => <SignInPage />} />
					<Route path="/welcome" exact render={() => <RecommendationPage />}/>
					<Route path="/profile" exact render={() => <ProfilePage />}/>
<<<<<<< HEAD
         			<Route path="/chat/:id" exact render={() => <ChatPage path='d'/>}/>
=======
          			<Route path="/chat/:id" exact render={() => <ChatPage path='d'/>}/>
>>>>>>> 683e846 (added the updated files from local chat repo)
        		</Router>
				<LiveChat />
			</Provider>
		);
	}
}

export default App;
