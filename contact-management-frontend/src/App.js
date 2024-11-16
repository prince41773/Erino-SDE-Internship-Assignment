import React, { useState } from 'react';
import { Container, Box, Paper, createTheme, ThemeProvider } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 'bold' },
    h3: { fontSize: '1.5rem' },
  },
});

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <h1>Contact Management System</h1>
        </Box>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <ContactForm refreshContacts={() => setRefreshFlag(!refreshFlag)} />
        </Paper>
        <Paper elevation={3} sx={{ p: 4 }}>
          <ContactTable refreshFlag={refreshFlag} setRefreshFlag={setRefreshFlag} />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
