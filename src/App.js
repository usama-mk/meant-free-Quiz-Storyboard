import './assets/scss/index.scss';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from './pages/home/Home';
import LetsStart from './pages/letsStart/LetsStart';
import Leaderboard from './pages/leaderboard/Leaderboard';
import Finish from './pages/finish/Finish';
import Milestone from './pages/milestone/Milestone';
function App() {
  return (
    <div className="App">
           <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lets-start" component={LetsStart} />
              <Route path="/milestones" component={Milestone} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/finish" component={Finish} />
            
          </Switch>
        </Router>
    </div>
  );
}

export default App;
