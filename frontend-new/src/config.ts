// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const config = {
  API_URL,
  endpoints: {
    heartDisease: `${API_URL}/predict/heart-disease`,
    diabetes: `${API_URL}/predict/diabetes`,
    cancer: `${API_URL}/predict/cancer`,
    chat: `${API_URL}/chat`,
  }
};

export default config; 