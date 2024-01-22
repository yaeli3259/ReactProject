import React from 'react'
import BusinessForm from './businessForm'
import ServicesList, { UserContext } from './servicesList'
import { Link } from 'react-router-dom';
import LockSharpIcon from '@mui/icons-material/LockSharp';
export default function UserScreen() {
  const handleAdminLogin = () => {
    // Update the login status and store it in localStorage
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  return (
    <UserContext.Provider value={{ isAdmin: false }}>
      <div style={{ backgroundColor: ' black' }}>
        <header style={{ position: 'sticky', top: 0, backgroundColor: '#BF0A30', padding: '10px', zIndex: 100, color: '#FFF9E3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ marginRight: 'auto' }}>
            <BusinessForm />
          </div>
          <Link to="/admin-login">
            <button
              onClick={handleAdminLogin}
              style={{ margin: '5px', borderRadius: '5px', backgroundColor: '#FFF9E3', width: '60px' }}
            >
              <LockSharpIcon /> login
            </button>
          </Link>
        </header>
        <ServicesList />
      </div>
    </UserContext.Provider>
  )
}
{/* <AppointmentForm2/> */ }