import React, { useState } from "react";
import ServiceData from "../Store/serviceData";
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react-lite";
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

////

const ServiceForm = observer(() => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { register, handleSubmit } = useForm();
  function onSubmit(event) {
    ServiceData.addServiceToServer(event);
  }
  return (
    <React.Fragment >
      <Button variant="outlined" onClick={handleClickOpen} sx={{ backgroundColor: '#FFF9E3', color: 'black', mt: 8, mb: 4 }}>
        Add Service
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}

      >
        <DialogTitle sx={{ m: 0, p: 2, height: 14, }} id="customized-dialog-title">
          New Service
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
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' }, maxWidth: 345,
              }}
              noValidate
              autoComplete="on"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField id="standard-basic" label="id" variant="standard" {...register("id")} />
              <TextField id="standard-basic" label="name" variant="standard" {...register("name")} />
              <TextField id="standard-basic" label="description" variant="standard"  {...register("description")} />
              <TextField id="standard-basic" label="price" variant="standard" {...register("price")} />
              <TextField id="standard-basic" label="duration" variant="standard" {...register("duration")} />
              <Stack spacing={2} direction="row">
                <Button type="submit" sx={{ color: '#BF0A30' }}>Add</Button>
              </Stack>
              <Stack spacing={2} direction="row">
              </Stack>
            </Card></div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
})
export default ServiceForm;