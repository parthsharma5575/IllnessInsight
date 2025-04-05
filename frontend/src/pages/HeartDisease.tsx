import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { HeartDiseaseInput, PredictionResponse } from '../types';

const HeartDisease = () => {
  const [formData, setFormData] = useState<HeartDiseaseInput>({
    age: 0,
    gender: 0,
    cp: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post<PredictionResponse>(
        'http://localhost:8000/predict/heart-disease',
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      setError('An error occurred while making the prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Heart Disease Prediction
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Enter your health parameters to predict the risk of heart disease
      </Typography>

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Chest Pain (1 for yes, 0 for no)"
                  name="cp"
                  type="number"
                  value={formData.cp}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fasting Blood Sugar"
                  name="fbs"
                  type="number"
                  value={formData.fbs}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Resting ECG (0, 1, or 2)"
                  name="restecg"
                  type="number"
                  value={formData.restecg}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Predict'}
                </Button>
              </Grid>
            </Grid>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {prediction && (
            <Alert
              severity={prediction.prediction === 0 ? 'success' : 'error'}
              sx={{ mt: 2 }}
            >
              {prediction.message}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HeartDisease; 