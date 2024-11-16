import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Box, IconButton, Tooltip, Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ContactTable = ({ refreshFlag, setRefreshFlag }) => {
  const [contacts, setContacts] = useState([]);
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  useEffect(() => {
    fetchContacts();
  }, [refreshFlag]);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contacts');
      setContacts(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch contacts', severity: 'error' });
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${deleteId}`);
      setSnackbar({ open: true, message: 'Contact deleted successfully', severity: 'success' });
      setDeleteId(null); // Close dialog
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to delete contact', severity: 'error' });
    }
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateContact = async () => {
    try {
      await axios.put(`http://localhost:5000/contacts/${editData._id}`, editData);
      setSnackbar({ open: true, message: 'Contact updated successfully', severity: 'success' });
      setEditData(null); // Close dialog
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update contact', severity: 'error' });
    }
  };

  return (
    <TableContainer>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact List</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact._id} hover>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => setEditData(contact)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" onClick={() => setDeleteId(contact._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
      />

      {editData && (
        <Dialog open={Boolean(editData)} onClose={() => setEditData(null)}>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
              <TextField name="firstName" label="First Name" value={editData.firstName} onChange={handleEditChange} />
              <TextField name="lastName" label="Last Name" value={editData.lastName} onChange={handleEditChange} />
              <TextField name="email" label="Email" value={editData.email} onChange={handleEditChange} />
              <TextField name="phoneNumber" label="Phone Number" value={editData.phoneNumber} onChange={handleEditChange} />
              <TextField name="company" label="Company" value={editData.company} onChange={handleEditChange} />
              <TextField name="jobTitle" label="Job Title" value={editData.jobTitle} onChange={handleEditChange} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditData(null)} color="secondary">Cancel</Button>
            <Button onClick={updateContact} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {deleteId && (
        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this contact?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)} color="secondary">Cancel</Button>
            <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </TableContainer>
  );
};

export default ContactTable;
