import React, { useState, useContext, createContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import serviceData from '../Store/serviceData';
import { observer } from "mobx-react-lite";
import ServiceForm from './serviceForm';
import AppointmentForm from './appoitmentForm';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import HeadphonesRoundedIcon from '@mui/icons-material/HeadphonesRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import StarBorderPurple500RoundedIcon from '@mui/icons-material/StarBorderPurple500Rounded';
export const UserContext = createContext(null);

const ServicesList = observer(() => {
  const isAdmin = useContext(UserContext);
  const [spacing,] = useState(2);
  return (
    <>
      <Grid sx={{ flexGrow: 1, mt: 1, background: 'linear-gradient(to bottom, grey, black)' }} container spacing={8}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {serviceData.services.map((service, index) => (
              <Grid
                spacing={6}
                key={index}
                item
                xs={12}
                md={3}
                lg={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',

                }}
              >
                <Paper
                  sx={{
                    height: 250,
                    width: 250,
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? '#1A2027' : '#FFF9E3',
                    mx: 'auto',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <KeyboardVoiceIcon
                    sx={{
                      '--Avatar-size': '10rem',
                      height: 30,
                      width: 30,
                      backgroundColor: ' #BF0A30',
                      borderRadius: '50%',
                      margin: 'auto'
                    }}
                  />
                  <div style={{ textAlign: 'left', marginLeft: '10px' }}>
                    <p>
                      <StarBorderPurple500RoundedIcon /> {service.id}
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      <HeadphonesRoundedIcon /> {service.name}
                    </p>
                    <p>
                      <DescriptionRoundedIcon /> {service.description}
                    </p>
                    <p>
                      <AttachMoneyRoundedIcon /> {service.price}
                    </p>
                    <p>
                      <AccessAlarmsRoundedIcon /> {service.duration}
                    </p>
                  </div>
                </Paper>

              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      {isAdmin.isAdmin && (<ServiceForm />)}
      {!isAdmin.isAdmin && (<AppointmentForm />)}
    </>
  );
})
export default ServicesList;