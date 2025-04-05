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
import { CancerInput, PredictionResponse } from '../types';

const Cancer = () => {
  const [formData, setFormData] = useState<CancerInput>({
    fo: 0,
    fhi: 0,
    flo: 0,
    jitter_percent: 0,
    jitter_abs: 0,
    rap: 0,
    ppq: 0,
    ddp: 0,
    shimmer: 0,
    shimmer_db: 0,
    apq3: 0,
    apq5: 0,
    apq: 0,
    dda: 0,
    nhr: 0,
    hnr: 0,
    rpde: 0,
    dfa: 0,
    spread1: 0,
    spread2: 0,
    d2: 0,
    ppe: 0,
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
        'http://localhost:8000/predict/cancer',
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
        Cancer Disease Prediction
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
        Enter voice-related biomarkers to predict the risk of cancer
      </Typography>

      <Card sx={{ maxWidth: 1200, mx: 'auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Fo (Hz)"
                  name="fo"
                  type="number"
                  value={formData.fo}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Fhi (Hz)"
                  name="fhi"
                  type="number"
                  value={formData.fhi}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Flo (Hz)"
                  name="flo"
                  type="number"
                  value={formData.flo}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Jitter (%)"
                  name="jitter_percent"
                  type="number"
                  value={formData.jitter_percent}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Jitter (Abs)"
                  name="jitter_abs"
                  type="number"
                  value={formData.jitter_abs}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="RAP"
                  name="rap"
                  type="number"
                  value={formData.rap}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="PPQ"
                  name="ppq"
                  type="number"
                  value={formData.ppq}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="DDP"
                  name="ddp"
                  type="number"
                  value={formData.ddp}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Shimmer"
                  name="shimmer"
                  type="number"
                  value={formData.shimmer}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Shimmer (dB)"
                  name="shimmer_db"
                  type="number"
                  value={formData.shimmer_db}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="APQ3"
                  name="apq3"
                  type="number"
                  value={formData.apq3}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="APQ5"
                  name="apq5"
                  type="number"
                  value={formData.apq5}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="APQ"
                  name="apq"
                  type="number"
                  value={formData.apq}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="DDA"
                  name="dda"
                  type="number"
                  value={formData.dda}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="NHR"
                  name="nhr"
                  type="number"
                  value={formData.nhr}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="HNR"
                  name="hnr"
                  type="number"
                  value={formData.hnr}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="RPDE"
                  name="rpde"
                  type="number"
                  value={formData.rpde}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="DFA"
                  name="dfa"
                  type="number"
                  value={formData.dfa}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Spread1"
                  name="spread1"
                  type="number"
                  value={formData.spread1}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Spread2"
                  name="spread2"
                  type="number"
                  value={formData.spread2}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="D2"
                  name="d2"
                  type="number"
                  value={formData.d2}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="PPE"
                  name="ppe"
                  type="number"
                  value={formData.ppe}
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

export default Cancer; 