import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import StatsPage from './components/pages/StatsPage';
import FormPage from './components/pages/FormPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/applications" element={<StatsPage />} />
          <Route path="/add-job" element={<FormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
