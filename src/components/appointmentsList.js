import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppointmentData from '../Store/appointmentData';
import { observer } from 'mobx-react-lite';

const AppointmentsList = observer(() => {
  const sortedAppointments = AppointmentData.appointments.slice().sort((a, b) => {
    const dateA = new Date(a.dateTime);
    const dateB = new Date(b.dateTime);
    return dateA - dateB;
  });

  const getColorForDateTime = (dateTime) => {
    const today = new Date();
    const appointmentDate = new Date(dateTime);

    if (appointmentDate.toDateString() === today.toDateString()) {
      return '#EA3C53'; // Today
    } else if (appointmentDate >= today && appointmentDate <= new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)) {
      return '#FC4C4E'; // This week
    } else {
      return '#FC9483'; // Default color for other appointments
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TableContainer component={Paper} sx={{ width: '70%', padding: '20px', backgroundColor: '#FFF9E3' }}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Client Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedAppointments.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: getColorForDateTime(row.dateTime) }} >
                <TableCell component="th" scope="row">
                  {row.serviceName}
                </TableCell>
                <TableCell align="right">
                  {row.dateTime}
                </TableCell>
                <TableCell align="right">{row.clientName}</TableCell>
                <TableCell align="right">{row.clientPhone}</TableCell>
                <TableCell align="right">{row.clientEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

});

export default AppointmentsList;

