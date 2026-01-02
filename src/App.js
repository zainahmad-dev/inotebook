import './App.css';
import { NavBar } from './components/NavBar';
import { Home } from './components/Home';
import { About } from './components/About';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import NoteState from './context/notes/NoteState';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NoteState>
      <Router>
        <NavBar onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;