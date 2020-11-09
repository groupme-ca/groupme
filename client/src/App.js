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
=======
import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import SignInPage from './pages/SignIn';
import RecommendationPage from './pages/Recommendations';
import ProfilePage from './pages/Profile';
import ChatPage from './pages/Chat';
import Pusher from 'pusher-js';
>>>>>>> 00fe425 (added chat.js and chat.css)

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

<<<<<<< HEAD
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
=======
function App() {

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
>>>>>>> 00fe425 (added chat.js and chat.css)
}

export default App;
