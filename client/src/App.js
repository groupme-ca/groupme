import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';
import RecommendationPage from './pages/Recommendations';

function App() {
  return (
    <Router>
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/signup' exact render={() => <SignUpPage /> } />
      <Route path='/welcome' exact render={() => <RecommendationPage /> } />
    </Router>
  );
}

export default App;
