// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EventList from './components/EventList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/" element={<Login />} /> {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
};

export default App;
