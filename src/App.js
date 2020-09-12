import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './client/components/Navbar/Navbar';
import Home from './client/components/pages/Home';

function App() {
  const  [randomId, setRandomId] = useState('');

  return (
    <Router>
      <Navbar setRandom={setRandomId}/>
      <Switch>
        <Route path='/random'>
          <Home random={true} randomId={randomId} />
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
