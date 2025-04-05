import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScienceIcon from '@mui/icons-material/Science';
import ChatIcon from '@mui/icons-material/Chat';
import Footer from '../components/Footer';

// Import SVG images
import heartImage from '../assets/heart-disease.svg';
import diabetesImage from '../assets/diabetes.svg';
import cancerImage from '../assets/cancer.svg';
import chatbotImage from '../assets/chatbot.svg';

const features = [
  {
    title: 'Heart Disease Prediction',
    description: 'Predict the likelihood of heart disease using advanced machine learning algorithms.',
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
    image: heartImage,
    path: '/heart-disease'
  },
  {
    title: 'Diabetes Prediction',
    description: 'Assess your risk of diabetes based on various health parameters and lifestyle factors.',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
    image: diabetesImage,
    path: '/diabetes'
  },
  {
    title: 'Cancer Prediction',
    description: 'Early detection of cancer risk using sophisticated predictive models.',
    icon: <ScienceIcon sx={{ fontSize: 40 }} />,
    image: cancerImage,
    path: '/cancer'
  },
  {
    title: 'AI Health Assistant',
    description: 'Get instant answers to your health-related questions from our AI-powered chatbot.',
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    image: chatbotImage,
    path: '/chat'
  }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ flex: 1, py: { xs: 4, md: 8 } }}>
        <Fade in timeout={1000}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, md: 8 },
            px: { xs: 2, md: 0 }
          }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 2
              }}
            >
              Welcome to IllnessInsight
            </Typography>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              color="text.secondary" 
              sx={{ mb: 4 }}
            >
              Your AI-Powered Health Prediction Platform
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 4,
                px: { xs: 2, md: 0 }
              }}
            >
              IllnessInsight leverages cutting-edge machine learning algorithms to provide accurate predictions
              for various health conditions. Our platform helps you understand your health risks and make
              informed decisions about your well-being.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ px: { xs: 1, md: 0 } }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={1000 + index * 200}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={feature.image}
                    alt={feature.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      gap: 1
                    }}>
                      {feature.icon}
                      <Typography variant="h6" component="h2">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ mb: 2, flexGrow: 1 }}
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={feature.path}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ 
          mt: { xs: 6, md: 8 }, 
          textAlign: 'center',
          px: { xs: 2, md: 0 }
        }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Why Choose IllnessInsight?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Accurate Predictions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our models are trained on extensive datasets and regularly updated for optimal accuracy.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Easy to Use
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Simple interface designed for users of all technical levels.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Instant Results
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get predictions and insights immediately without any waiting time.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Home; 