import './App.css';
import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { About } from './components/About';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default route (Home) */}
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;