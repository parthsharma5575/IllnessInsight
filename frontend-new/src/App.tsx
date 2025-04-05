import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HeartDisease from './pages/HeartDisease';
import Diabetes from './pages/Diabetes';
import Cancer from './pages/Cancer';
import Chat from './pages/Chat';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heart-disease" element={<HeartDisease />} />
            <Route path="/diabetes" element={<Diabetes />} />
            <Route path="/cancer" element={<Cancer />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
