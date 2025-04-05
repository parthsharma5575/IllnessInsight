import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ChatIcon from '@mui/icons-material/Chat';

const features = [
  {
    title: 'Heart Disease Prediction',
    description: 'Analyze critical health metrics like cholesterol levels, blood pressure, and heart rate to predict the risk of heart disease.',
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    link: '/heart-disease',
  },
  {
    title: 'Diabetes Prediction',
    description: 'Evaluate factors such as glucose levels, BMI, and insulin levels to determine the possibility of diabetes.',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    link: '/diabetes',
  },
  {
    title: 'Cancer Disease Prediction',
    description: 'Utilize voice-related biomarkers and other health parameters to predict cancer disease.',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    link: '/cancer',
  },
  {
    title: 'AI-Powered Chat Assistance',
    description: 'Ask questions about diseases, symptoms, or general health advice, and receive intelligent responses.',
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    link: '/chat',
  },
];

const Home = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Welcome to IllnessInsight
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 4 }}>
            An innovative, AI-powered platform designed to assist users in predicting
            the likelihood of various diseases based on their health parameters.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2, color: 'primary.main' }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={feature.link}
                    variant="contained"
                    fullWidth
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 