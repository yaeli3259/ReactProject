
import React, { useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { observer } from "mobx-react-lite";
import BusinessData from "../Store/businessData";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { UserContext } from "./servicesList";
import { Avatar } from "@mui/material";
import { CardMedia } from "@mui/material";
const BusinessForm = observer(() => {
  const isAdmin = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const { register, handleSubmit, setValue } = useForm();

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData(BusinessData.businessDetails);
  };

  const handleFormClose = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const businessDetails = BusinessData.businessDetails;

  const onSubmit = (data) => {
    console.log(data);
    BusinessData.updateDetailsOnServer(data);
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {isAdmin.isAdmin && (<div style={{ marginRight: '10px' }}>
        <IconButton onClick={handleEditClick} aria-label="edit" sx={{ backgroundColor: '#FFF9E3' }}>
          <EditIcon />
        </IconButton>
      </div>)}

      <Dialog open={isEditing} onClose={handleFormClose}>
        <DialogTitle>Edit Business Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '350px' }}>
            <TextField
              label="Name"
              {...register("name")}
              value={formData.name || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.4rem' }}
            />
            <TextField
              label="Address"
              {...register("address")}
              value={formData.address || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.2rem' }}
            />
            <TextField
              label="Phone"
              {...register("phone")}
              value={formData.phone || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.2rem' }}
            />
            <TextField
              label="Owner"
              {...register("owner")}
              value={formData.owner || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.2rem' }}
            />
            <TextField
              label="Description"
              {...register("description")}
              value={formData.description || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.2rem' }}
            />
            <TextField
              label="Logo"
              {...register("logo")}
              value={formData.logo || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{ margin: '0.2rem' }}
            />
            <DialogActions>
              <Button onClick={handleFormClose} sx={{ color: ' #BF0A30' }}>Cancel</Button>
              <Button type="submit" sx={{ color: ' #BF0A30' }}>Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>

        <img src={businessDetails.logo} alt="Logo" style={{ height: '140px', width: '140px', marginRight: '10px' }} />

        <div>
          <Typography variant="h6">{businessDetails.name}</Typography>

          <Typography>{businessDetails.address}</Typography>
          <Typography>{businessDetails.phone}</Typography>
          <Typography>{businessDetails.owner}</Typography>
          <Typography>{businessDetails.description}</Typography>
        </div>
      </div>
    </div >
  );
});

export default BusinessForm;
