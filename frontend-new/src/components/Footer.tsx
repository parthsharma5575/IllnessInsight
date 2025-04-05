import React from 'react';
import { Box, Container, Typography, Link, Grid, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              IllnessInsight is dedicated to providing accurate health predictions
              using advanced AI and machine learning technologies.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link 
              href="/heart-disease" 
              color="text.primary" 
              display="block"
              sx={{ 
                '&:hover': { 
                  color: theme.palette.primary.main 
                } 
              }}
            >
              Heart Disease Prediction
            </Link>
            <Link 
              href="/diabetes" 
              color="text.primary" 
              display="block"
              sx={{ 
                '&:hover': { 
                  color: theme.palette.primary.main 
                } 
              }}
            >
              Diabetes Prediction
            </Link>
            <Link 
              href="/cancer" 
              color="text.primary" 
              display="block"
              sx={{ 
                '&:hover': { 
                  color: theme.palette.primary.main 
                } 
              }}
            >
              Cancer Prediction
            </Link>
            <Link 
              href="/chat" 
              color="text.primary" 
              display="block"
              sx={{ 
                '&:hover': { 
                  color: theme.palette.primary.main 
                } 
              }}
            >
              AI Health Assistant
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: support@illnessinsight.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link 
              color="text.primary" 
              href="/"
              sx={{ 
                '&:hover': { 
                  color: theme.palette.primary.main 
                } 
              }}
            >
              IllnessInsight
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 