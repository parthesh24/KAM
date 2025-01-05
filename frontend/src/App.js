import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import {Dashboard} from './pages/Dashboard';
import {Lead} from './pages/Lead';
import Contacts from './pages/Contacts';
import Interaction from './pages/Interaction';
import CallPlanning from './pages/CallPlanning';
import Performance from './pages/Performance';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            KAM Lead Management
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/lead">
              Leads
            </Button>
            <Button color="inherit" component={Link} to="/performance">
              Performance
            </Button>
            <Button color='inherit' component={Link} to={`/callplanning/`}>
              Plan A Call
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/lead" element={<Lead/>} />
          <Route path="/contact/:leadId" element={<Contacts/>} />
          <Route path="/interaction/:leadId" element={<Interaction/>} />
          <Route path="/performance" element={<Performance/>} />
          <Route path="/callplanning/" element={<CallPlanning/>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;