import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import AddGame from './pages/AddGame';
import './App.css';

function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/add" element={<AddGame />}/>
        </Routes>
      </Router>
  );
}

export default App;
