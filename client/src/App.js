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
import ChatPage from './pages/Chat';


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
         			<Route path="/chat/:id" exact render={() => <ChatPage path='d'/>}/>
        		</Router>
				<LiveChat />
			</Provider>
		);
	}
}

export default App;
