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
import config from '../config';

interface HeartDiseaseInput {
  age: number | '';
  gender: number | '';
  cp: number | '';
  trestbps: number | '';
  chol: number | '';
  fbs: number | '';
  restecg: number | '';
  thalach: number | '';
  exang: number | '';
  oldpeak: number | '';
  slope: number | '';
  ca: number | '';
  thal: number | '';
}

interface PredictionResponse {
  prediction: number;
  probability: number;
  message: string;
}

const HeartDisease = () => {
  const [formData, setFormData] = useState<HeartDiseaseInput>({
    age: '',
    gender: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
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
      const response = await axios.post<PredictionResponse>(config.endpoints.heartDisease, apiData);
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
          Heart Disease Prediction
        </Typography>
        <Typography variant="body1" paragraph align="center" color="text.secondary">
          Enter your health parameters to predict the likelihood of heart disease.
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
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
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Gender (1 for male, 0 for female)"
                  name="gender"
                  type="number"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Chest Pain Type (0-3)"
                  name="cp"
                  type="number"
                  value={formData.cp}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Resting Blood Pressure"
                  name="trestbps"
                  type="number"
                  value={formData.trestbps}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Cholesterol"
                  name="chol"
                  type="number"
                  value={formData.chol}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Fasting Blood Sugar (1 for > 120 mg/dl, 0 for ≤ 120 mg/dl)"
                  name="fbs"
                  type="number"
                  value={formData.fbs}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Resting ECG Results (0, 1, 2)"
                  name="restecg"
                  type="number"
                  value={formData.restecg}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Maximum Heart Rate"
                  name="thalach"
                  type="number"
                  value={formData.thalach}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Exercise-Induced Angina (1 for yes, 0 for no)"
                  name="exang"
                  type="number"
                  value={formData.exang}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Old Peak"
                  name="oldpeak"
                  type="number"
                  value={formData.oldpeak}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Slope (0, 1, or 2)"
                  name="slope"
                  type="number"
                  value={formData.slope}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Number of Major Vessels (0-4)"
                  name="ca"
                  type="number"
                  value={formData.ca}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} component="div">
                <TextField
                  fullWidth
                  label="Thalassemia (0, 1, 2, or 3)"
                  name="thal"
                  type="number"
                  value={formData.thal}
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

export default HeartDisease; 