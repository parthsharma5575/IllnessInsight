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
import { DiabetesInput, PredictionResponse } from '../types';

const Diabetes = () => {
  const [formData, setFormData] = useState<DiabetesInput>({
    pregnancies: 0,
    glucose: 0,
    blood_pressure: 0,
    skin_thickness: 0,
    insulin: 0,
    bmi: 0,
    diabetes_pedigree: 0,
    age: 0,
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
        'http://localhost:8000/predict/diabetes',
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
        Diabetes Prediction
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Enter your health parameters to predict the risk of diabetes
      </Typography>

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Blood Pressure"
                  name="blood_pressure"
                  type="number"
                  value={formData.blood_pressure}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Skin Thickness"
                  name="skin_thickness"
                  type="number"
                  value={formData.skin_thickness}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Diabetes Pedigree Function"
                  name="diabetes_pedigree"
                  type="number"
                  value={formData.diabetes_pedigree}
                  onChange={handleChange}
                  required
                />
              </Grid>
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

export default Diabetes; 