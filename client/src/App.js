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
import Messaging from './pages/Messaging.js'


function App() {
  return (
    <Router>
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/signup' exact render={() => <SignUpPage /> } />
      <Route path='/welcome' exact render={() => <RecommendationPage /> } />
      <Route path='/profile' exact render={() => <ProfilePage /> } />
      <Route path='/messaging' exact render={() => <Messaging /> } />
    </Router>
  );
}

export default App;
