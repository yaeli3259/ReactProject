import React, { useState } from 'react';
import ServicesList from './servicesList'; // Import the ServicesList component
import AppointmentsList from './appointmentsList'; // Import the AppointmentsList component
import { Link } from 'react-router-dom';
export default function ContentAdmin() {
  const [showServices, setShowServices] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  const handleServicesClick = () => {
    setShowServices(true);
    setShowAppointments(false);
  };

  const handleAppointmentsClick = () => {
    setShowServices(false);
    setShowAppointments(true);
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, grey, black)', minHeight: '100vh', color: 'white' }}>
      <div style={{ margin: 0, textAlign: 'center' }}>
        <Link to="/admin/services">
          <button style={{
            fontSize: '20px', padding: '10px', margin: '10px', borderRadius: '20px',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#FFF9E3'), color: 'black'
          }}
            onClick={() => handleServicesClick()}>SERVICES</button>
        </Link>
        <Link to="/admin/appointments">
          <button style={{
            fontSize: '20px', padding: '10px', margin: '10px', borderRadius: '20px',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#FFF9E3'), color: 'black'
          }}
            onClick={() => handleAppointmentsClick()}>APPOINTMENTS</button>
        </Link>
        {showServices && <ServicesList />}
        {showAppointments && <AppointmentsList />}
      </div>

    </div>
  );
}

