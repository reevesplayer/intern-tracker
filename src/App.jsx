import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import StatsPage from './components/pages/StatsPage';
import FormPage from './components/pages/FormPage';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <NextUIProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/applications" element={<StatsPage />} />
            <Route path="/add-job" element={<FormPage />} />
          </Routes>
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
