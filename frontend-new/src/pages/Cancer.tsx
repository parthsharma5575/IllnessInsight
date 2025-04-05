import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

interface CancerInput {
  radius_mean: number | '';
  texture_mean: number | '';
  perimeter_mean: number | '';
  area_mean: number | '';
  smoothness_mean: number | '';
  compactness_mean: number | '';
  concavity_mean: number | '';
  concave_points_mean: number | '';
  symmetry_mean: number | '';
  fractal_dimension_mean: number | '';
  radius_se: number | '';
  texture_se: number | '';
  perimeter_se: number | '';
  area_se: number | '';
  smoothness_se: number | '';
  compactness_se: number | '';
  concavity_se: number | '';
  concave_points_se: number | '';
  symmetry_se: number | '';
  fractal_dimension_se: number | '';
  radius_worst: number | '';
  texture_worst: number | '';
}

interface PredictionResponse {
  prediction: number;
  probability: number;
  message: string;
}

const Cancer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [formData, setFormData] = useState<CancerInput>({
    radius_mean: '',
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: '',
    concavity_mean: '',
    concave_points_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
    radius_se: '',
    texture_se: '',
    perimeter_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    radius_worst: '',
    texture_worst: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Convert empty strings to 0 for the API
      const apiData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, value === '' ? 0 : value])
      );
      const response = await axios.post<PredictionResponse>('http://localhost:8000/predict/cancer', apiData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value)
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 2
          }}
        >
          Cancer Prediction
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center',
            mb: 4,
            px: { xs: 2, md: 0 }
          }}
        >
          Enter the following measurements to predict the likelihood of cancer.
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 },
          borderRadius: 2
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Radius Mean"
                name="radius_mean"
                type="number"
                value={formData.radius_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Texture Mean"
                name="texture_mean"
                type="number"
                value={formData.texture_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Perimeter Mean"
                name="perimeter_mean"
                type="number"
                value={formData.perimeter_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area Mean"
                name="area_mean"
                type="number"
                value={formData.area_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Smoothness Mean"
                name="smoothness_mean"
                type="number"
                value={formData.smoothness_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Compactness Mean"
                name="compactness_mean"
                type="number"
                value={formData.compactness_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Concavity Mean"
                name="concavity_mean"
                type="number"
                value={formData.concavity_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Concave Points Mean"
                name="concave_points_mean"
                type="number"
                value={formData.concave_points_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Symmetry Mean"
                name="symmetry_mean"
                type="number"
                value={formData.symmetry_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fractal Dimension Mean"
                name="fractal_dimension_mean"
                type="number"
                value={formData.fractal_dimension_mean}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Radius SE"
                name="radius_se"
                type="number"
                value={formData.radius_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Texture SE"
                name="texture_se"
                type="number"
                value={formData.texture_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Perimeter SE"
                name="perimeter_se"
                type="number"
                value={formData.perimeter_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Area SE"
                name="area_se"
                type="number"
                value={formData.area_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Smoothness SE"
                name="smoothness_se"
                type="number"
                value={formData.smoothness_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Compactness SE"
                name="compactness_se"
                type="number"
                value={formData.compactness_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Concavity SE"
                name="concavity_se"
                type="number"
                value={formData.concavity_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Concave Points SE"
                name="concave_points_se"
                type="number"
                value={formData.concave_points_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Symmetry SE"
                name="symmetry_se"
                type="number"
                value={formData.symmetry_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fractal Dimension SE"
                name="fractal_dimension_se"
                type="number"
                value={formData.fractal_dimension_se}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Radius Worst"
                name="radius_worst"
                type="number"
                value={formData.radius_worst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Texture Worst"
                name="texture_worst"
                type="number"
                value={formData.texture_worst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Get Prediction'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {prediction && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Prediction Results
            </Typography>
            <Alert 
              severity={prediction.prediction === 1 ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              <Typography variant="body1">
                {prediction.message}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Probability: {(prediction.probability * 100).toFixed(2)}%
              </Typography>
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Cancer; 