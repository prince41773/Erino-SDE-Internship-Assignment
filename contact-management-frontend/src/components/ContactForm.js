import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const ContactForm = ({ refreshContacts }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/contacts', formData);
      alert('Contact added successfully!');
      refreshContacts(); // Refresh contact list
      setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding contact');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <h3>Add New Contact</h3>
      <TextField name="firstName" label="First Name" value={formData.firstName} onChange={handleChange} required fullWidth margin="normal" />
      <TextField name="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} required fullWidth margin="normal" />
      <TextField name="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth margin="normal" />
      <TextField name="phoneNumber" label="Phone Number" value={formData.phoneNumber} onChange={handleChange} required fullWidth margin="normal" />
      <TextField name="company" label="Company" value={formData.company} onChange={handleChange} required fullWidth margin="normal" />
      <TextField name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} required fullWidth margin="normal" />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Add Contact</Button>
    </Box>
  );
};

export default ContactForm;
