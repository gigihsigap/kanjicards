import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

import About from './pages/About';
import AddCard from './pages/AddCard';
import EditCard from './pages/EditCard';
import HomePage from './pages/HomePage';
import Training from './pages/Training';

const App: React.FC = () => {

  return (
    <div className="App" style={{margin: 0}}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/add" component={AddCard} />
          <Route path="/edit" component={EditCard} />
          <Route path="/training" component={Training} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
