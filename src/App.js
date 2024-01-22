
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserScreen from './components/userScreen';
import AdminScreen from './components/adminScreen';
import AppointmentsList from './components/appointmentsList';
import ServicesList, { UserContext } from './components/servicesList';
import Login from './components/login';

function App() {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for the login status when the component mounts
    const storedLoginStatus = localStorage.getItem('isAdminLoggedIn');
    if (storedLoginStatus === 'true') {
      setAdminLoggedIn(true);
    }
  }, []);
  const handleAdminLogin = () => {
    // Update the login status and store it in localStorage
    setAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const handleAdminLogout = () => {
    // Clear the login status from state and localStorage
    setAdminLoggedIn(false);
    localStorage.removeItem('isAdminLoggedIn');
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={""} element={<UserScreen />} />
       
            <Route
              path={"admin-login"}
              element={<Login onLogin={handleAdminLogin} />}
            />
      
          {isAdminLoggedIn ? (
            <Route
              path={"admin"}
              element={<AdminScreen onLogout={handleAdminLogout} />}
            >
              <Route
                path={'services'}
                element={
                  <UserContext.Provider value={{ isAdmin: true }}>
                    <ServicesList />
                  </UserContext.Provider>
                }
              ></Route>
              <Route path={'appointments'} element={<AppointmentsList />} />
            </Route>
          ) : null}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


