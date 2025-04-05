import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

const Navbar = ({ toggleColorMode, mode }: NavbarProps) => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LocalHospitalIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            IllnessInsight
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              component={RouterLink}
              to="/heart-disease"
              sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
            >
              Heart Disease
            </Button>
            <Button
              component={RouterLink}
              to="/diabetes"
              sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
            >
              Diabetes
            </Button>
            <Button
              component={RouterLink}
              to="/cancer"
              sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
            >
              Cancer
            </Button>
            <Button
              component={RouterLink}
              to="/chat"
              sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
            >
              Chat Assistant
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={`Toggle ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 