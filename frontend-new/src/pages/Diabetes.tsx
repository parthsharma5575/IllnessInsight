import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

interface DiabetesInput {
  pregnancies: number | '';
  glucose: number | '';
  bloodPressure: number | '';
  skinThickness: number | '';
  insulin: number | '';
  bmi: number | '';
  diabetesPedigree: number | '';
  age: number | '';
}

interface PredictionResponse {
  prediction: number;
  probability: number;
  message: string;
}

const Diabetes = () => {
  const [formData, setFormData] = useState<DiabetesInput>({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
  });
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Convert empty strings to 0 for the API
      const apiData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === '' ? 0 : value])
      );
      const response = await axios.post<PredictionResponse>('http://localhost:8000/predict/diabetes', apiData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error:', err);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value)
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Diabetes Prediction
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Enter your health parameters to predict the likelihood of diabetes.
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Number of Pregnancies"
                  name="pregnancies"
                  type="number"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Glucose Level"
                  name="glucose"
                  type="number"
                  value={formData.glucose}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Blood Pressure"
                  name="bloodPressure"
                  type="number"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Skin Thickness"
                  name="skinThickness"
                  type="number"
                  value={formData.skinThickness}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Insulin Level"
                  name="insulin"
                  type="number"
                  value={formData.insulin}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="BMI"
                  name="bmi"
                  type="number"
                  value={formData.bmi}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Diabetes Pedigree Function"
                  name="diabetesPedigree"
                  type="number"
                  value={formData.diabetesPedigree}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} component="div">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Predict'}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {prediction && (
            <Box sx={{ mt: 3, p: 2, bgcolor: prediction.prediction === 1 ? 'error.light' : 'success.light', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Prediction Result
              </Typography>
              <Typography variant="body1">
                {prediction.message}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Probability: {(prediction.probability * 100).toFixed(2)}%
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Diabetes; 