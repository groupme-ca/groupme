import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './pages/Landing';
import SignUpPage from './pages/SignUp';

function App() {
  return (
    <Router>
      <Route path='/' exact render={() => <LandingPage />} />
      <Route path='/signup' exact render={() => <SignUpPage /> } />
    </Router>
  );
}

export default App;
