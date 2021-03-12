import React from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

import About from './pages/About';
import AddCard from './pages/AddCard';
import EditCard from './pages/EditCard';
import HomePage from './pages/HomePage';
import PracticeSession from './pages/PracticeSession';
import PracticeSettings from './pages/PracticeSettings';
import DeckList from './pages/DeckList';
import ExportDeck from './pages/ExportDeck';
import AddDeck from './pages/AddDeck';
import PreMadeDecks from './pages/PreMadeDecks';

const App: React.FC = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/add-card" component={AddCard} />
          <Route path="/edit-card" component={EditCard} />
          <Route path="/deck-list" component={DeckList} />
          <Route path="/add-deck" component={AddDeck} />
          <Route path="/export-deck" component={ExportDeck} />
          <Route path="/premades" component={PreMadeDecks} />
          <Route path="/practice-settings" component={PracticeSettings} />
          <Route path="/practice-session" component={PracticeSession} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
