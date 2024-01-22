import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import appointmentData from '../Store/appointmentData';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { useForm } from 'react-hook-form';
import serviceData from '../Store/serviceData';
import { Card, MenuItem, Select, InputLabel, Input } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AppointmentForm = observer(() => {
  const [selectedService, setSelectedService] = useState('');
  const [type, setType] = useState('Choose Service');
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);
    setType(selectedValue);
  };
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    const service = serviceData.services.find(s => s.name === data.serviceName);

    if (service != null) {
      const newMeet = {
        serviceName: service.name,
        serviceDescription: service.description,
        servicePrice: service.price,
        dateTime: data.date,
        clientName: data.clientName,
        clientPhone: data.phone,
        clientEmail: data.mail,
      };

      console.log(newMeet);

      try {
        const response = await appointmentData.addAppointmentToServer(newMeet);
        console.log(response);

        // Check the response status or any other relevant information
        if (response && response.status === 'success') {
          setError(false);
          // Close the dialog if the meeting is added successfully
          handleClose();
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error caught:", error);
        setError(true);
      }
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#FFF9E3', color: 'black', mt: 8, mb: 2 }}>
        Add Appointment
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2, height: 14 }} id="customized-dialog-title">
          New Appoinment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
        <Dialog
          onClose={handleClose} open={open}>
          <Card
            component="form"
            sx={{
              width: '35ch',
              p: 3,
              direction: 'rtl',

            }}
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputLabel id="demo-select-small-label">Choose Service</InputLabel>
            <Select
              {...register('serviceName', { required: true })}
              error={errors.type ? true : false}
              helperText={errors.type ? 'This field is required' : ''}
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={type}
              onChange={handleChange}
              style={{ width: '300px', border: '1px solid #ced4da', borderRadius: '4px', color: ' #BF0A30' }}
            >
              {serviceData.services.map(service =>
                <MenuItem key={service.name} value={service.name}>
                  {service.name}
                </MenuItem>
              )}
            </Select>
            <br />
            <TextField id="standard-basic" label="name" variant="standard"
              {...register('clientName', { required: true })}
              error={errors.name ? true : false}
              helperText={errors.name ? 'This field is required' : ''}
              type="text"
              sx={{
                mb: 1.5,
                direction: 'rtl'
              }} />
            <br />

            <TextField id="standard-basic" variant="standard"
              label="phone"
              {...register('phone', {
                required: true,
                pattern: /^\d+$/,
              })}
              error={errors.phone}
              helperText={errors.phone ? 'Please enter a valid phone number' : ''}
              type="phone"
              sx={{
                mb: 1.5,
              }}
            />

            <TextField id="standard-basic" variant="standard"
              label="mail"
              {...register('mail', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              error={errors.mail}
              helperText={errors.mail ? 'Please enter a valid email address' : ''}
              type='email'
              sx={{
                mb: 1.5,
              }}
            />
            <Input type="datetime-local"  {...register("date")} required sx={{ padding: 0.5, }} />
            <br />
            <Button type="submit" variant="contained" color="primary" sx={{ padding: 0.5, color: '#BF0A30', backgroundColor: 'white', mt: 3 }}>
              Set Appointment
            </Button>
          </Card>
        </Dialog>
      </BootstrapDialog>
    </div>
  );
})
export default AppointmentForm;

