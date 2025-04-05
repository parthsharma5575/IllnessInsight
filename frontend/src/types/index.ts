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
  fo: number;
  fhi: number;
  flo: number;
  jitter_percent: number;
  jitter_abs: number;
  rap: number;
  ppq: number;
  ddp: number;
  shimmer: number;
  shimmer_db: number;
  apq3: number;
  apq5: number;
  apq: number;
  dda: number;
  nhr: number;
  hnr: number;
  rpde: number;
  dfa: number;
  spread1: number;
  spread2: number;
  d2: number;
  ppe: number;
}

export interface PredictionResponse {
  prediction: number;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
} 