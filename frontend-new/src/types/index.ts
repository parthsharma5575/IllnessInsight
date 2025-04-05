export interface HeartDiseaseInput {
  age: number;
  gender: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

export interface DiabetesInput {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree: number;
  age: number;
}

export interface CancerInput {
  radius_mean: number;
  texture_mean: number;
  perimeter_mean: number;
  area_mean: number;
  smoothness_mean: number;
  compactness_mean: number;
  concavity_mean: number;
  concave_points_mean: number;
  symmetry_mean: number;
  fractal_dimension_mean: number;
  radius_se: number;
  texture_se: number;
  perimeter_se: number;
  area_se: number;
  smoothness_se: number;
  compactness_se: number;
  concavity_se: number;
  concave_points_se: number;
  symmetry_se: number;
  fractal_dimension_se: number;
  radius_worst: number;
  texture_worst: number;
  perimeter_worst: number;
  area_worst: number;
  smoothness_worst: number;
  compactness_worst: number;
  concavity_worst: number;
  concave_points_worst: number;
  symmetry_worst: number;
  fractal_dimension_worst: number;
}

export interface PredictionResponse {
  prediction: number;
  probability: number;
  message: string;
}

export interface ChatInput {
  message: string;
}

export interface ChatResponse {
  response: string;
} 