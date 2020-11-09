import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { loadUser } from "./actions/authActions";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import RecommendationPage from "./pages/Recommendations";
import ProfilePage from "./pages/Profile";
import Pusher from "pusher-js";

<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./store";
import { useEffect, Component } from "react";
=======
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import RecommendationPage from './pages/Recommendations';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';
import Pusher from 'pusher-js';
>>>>>>> 4b4798b (added chat.js and chat.css)

class App extends Component {
	//THIS SEGMENT IS FOR MAKING THE DB REAL TIME
	// useEffect(() => {
	//   const pusher = new Pusher('d386d4bf8093a108cca2', {
	//     cluster: 'us2'
	//   });

	//   const channel = pusher.subscribe('messages-channel');
	//   channel.bind('inserted', function(data) {
	//     alert(JSON.stringify(data));
	//   });
	// }, []);
	componentDidMount() {
		store.dispatch(loadUser());
	}

<<<<<<< HEAD
<<<<<<< HEAD
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Route path="/" exact render={() => <LandingPage />} />
					<Route path="/signup" exact render={() => <SignUpPage />} />
					<Route path="/signin" exact render={() => <SignInPage />} />
					<Route
						path="/welcome"
						exact
						render={() => <RecommendationPage />}
					/>
					<Route
						path="/profile"
						exact
						render={() => <ProfilePage />}
					/>
				</Router>
			</Provider>
		);
	}
=======
  //THIS SEGMENT IS FOR MAKING THE DB REAL TIME
  // useEffect(() => {
  //   const pusher = new Pusher('d386d4bf8093a108cca2', {
  //     cluster: 'us2'
  //   });
=======
//  THIS SEGMENT IS FOR MAKING THE DB REAL TIME
  useEffect(() => {
    const pusher = new Pusher('d386d4bf8093a108cca2', {
      cluster: 'us2'
    });
>>>>>>> 182b7a6 (changed the messages model to a chat model)

    const channel = pusher.subscribe('chats-channel');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

  return (
    <Provider store={store}>
    <Router>
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/signup' exact render={() => <SignUpPage /> } />
      <Route path='/signin' exact render={() => <SignInPage /> } />
      <Route path='/welcome' exact render={() => <RecommendationPage /> } />
      <Route path='/profile' exact render={() => <ProfilePage /> } />
      <Route path='/chat' exact render={() => <ChatPage />} />
    </Router>
    </Provider>
  );
>>>>>>> 4b4798b (added chat.js and chat.css)
}

export default App;
