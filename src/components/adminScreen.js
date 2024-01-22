// AdminScreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './servicesList';
import BusinessForm from './businessForm';
import ContentAdmin from './contentAdmin';
import LockOpenSharpIcon from '@mui/icons-material/LockOpenSharp';
import LockSharpIcon from '@mui/icons-material/LockSharp';
export default function AdminScreen({ onLogout }) {
  const handleAdminLogout = () => {
    // Clear the login status from state and localStorage
    localStorage.removeItem('isAdminLoggedIn');
  };
  return (
    <UserContext.Provider value={{ isAdmin: true }}>
      <div style={{ backgroundColor: ' #BF0A30' }}>
        <header style={{ position: 'sticky', top: 0, backgroundColor: ' #BF0A30', padding: '10px', zIndex: 100, color: '#FFF9E3', display: 'flex', justifyContent: 'space-between' }}>
          <BusinessForm />
          <div>
            <Link to="/">
              <button
                onClick={handleAdminLogout}
                style={{ margin: '5px', borderRadius: '5px', backgroundColor: '#FFF9E3', width: '60px' }}
              ><LockOpenSharpIcon />logout </button>
            </Link>
          </div>
        </header>
        <div>
          <ContentAdmin />
        </div>
      </div>
    </UserContext.Provider>
  );
}

