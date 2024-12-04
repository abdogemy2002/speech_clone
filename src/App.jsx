import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import CustomNavbar from './components/CustomNavbar';

const App = () => {
  return (
    <Router>
      <div>
        <CustomNavbar />
        {/* Define the routes */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> Home page route */}
          <Route path="/" element={<SignUp />} /> {/* Sign-up page route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
