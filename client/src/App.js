import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import RecommendationPage from './pages/Recommendations';
import ProfilePage from './pages/Profile';


import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/signup' exact render={() => <SignUpPage /> } />
      <Route path='/welcome' exact render={() => <RecommendationPage /> } />
      <Route path='/profile' exact render={() => <ProfilePage /> } />
    </Router>
    </Provider>
  );
}

export default App;
