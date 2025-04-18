from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os
import google.generativeai as genai
from typing import List, Optional
from dotenv import load_dotenv
import joblib
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="IllnessInsight API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models as None
heart_model = None
diabetes_model = None
cancer_model = None
model = None

# Configure Gemini AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    logger.warning("GOOGLE_API_KEY not set. Chat functionality will be disabled.")
else:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        logger.info("Successfully configured Gemini AI")
    except Exception as e:
        logger.error(f"Error configuring Gemini AI: {str(e)}")

# Load machine learning models
try:
    with open('models/heart_model.sav', 'rb') as f:
        heart_model = pickle.load(f)
    with open('models/diabetes_model.sav', 'rb') as f:
        diabetes_model = pickle.load(f)
        # Set probability=True for diabetes model if it's an SVC model
        if hasattr(diabetes_model, 'probability') and not diabetes_model.probability:
            diabetes_model.probability = True
    with open('models/cancer_model.sav', 'rb') as f:
        cancer_model = pickle.load(f)
        # Set probability=True for cancer model if it's an SVC model
        if hasattr(cancer_model, 'probability') and not cancer_model.probability:
            cancer_model.probability = True
    logger.info("Successfully loaded all ML models")
except Exception as e:
    logger.error(f"Error loading ML models: {str(e)}")
    # Don't raise the exception, just log it
    # This allows the app to start even if models fail to load

# Pydantic models for input validation
class HeartDiseaseInput(BaseModel):
    age: float
    gender: float
    cp: float
    trestbps: float
    chol: float
    fbs: float
    restecg: float
    thalach: float
    exang: float
    oldpeak: float
    slope: float
    ca: float
    thal: float

class DiabetesInput(BaseModel):
    pregnancies: float
    glucose: float
    bloodPressure: float
    skinThickness: float
    insulin: float
    bmi: float
    diabetesPedigree: float
    age: float

class CancerInput(BaseModel):
    radius_mean: float
    texture_mean: float
    perimeter_mean: float
    area_mean: float
    smoothness_mean: float
    compactness_mean: float
    concavity_mean: float
    concave_points_mean: float
    symmetry_mean: float
    fractal_dimension_mean: float
    radius_se: float
    texture_se: float
    perimeter_se: float
    area_se: float
    smoothness_se: float
    compactness_se: float
    concavity_se: float
    concave_points_se: float
    symmetry_se: float
    fractal_dimension_se: float
    radius_worst: float
    texture_worst: float

class ChatInput(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    message: str

@app.get("/")
async def health_check():
    """Health check endpoint for Railway deployment."""
    return {"status": "healthy", "message": "IllnessInsight API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/predict/heart-disease", response_model=PredictionResponse)
async def predict_heart_disease(input_data: HeartDiseaseInput):
    if heart_model is None:
        logger.error("Heart disease model not loaded")
        raise HTTPException(status_code=503, detail="Heart disease model not available")
    
    try:
        # Convert input data to list for model prediction
        features = [
            input_data.age, input_data.gender, input_data.cp, input_data.trestbps,
            input_data.chol, input_data.fbs, input_data.restecg, input_data.thalach,
            input_data.exang, input_data.oldpeak, input_data.slope, input_data.ca,
            input_data.thal
        ]
        
        # Make prediction
        prediction = heart_model.predict([features])[0]
        probability = heart_model.predict_proba([features])[0][1]
        
        # Generate message based on prediction
        message = "High risk of heart disease detected." if prediction == 1 else "Low risk of heart disease detected."
        
        logger.info(f"Heart disease prediction made: {prediction} with probability {probability}")
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(probability),
            message=message
        )
    except Exception as e:
        logger.error(f"Error in heart disease prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/diabetes", response_model=PredictionResponse)
async def predict_diabetes(input_data: DiabetesInput):
    if diabetes_model is None:
        logger.error("Diabetes model not loaded")
        raise HTTPException(status_code=503, detail="Diabetes model not available")
    
    try:
        # Convert input data to list for model prediction
        features = [
            input_data.pregnancies, input_data.glucose, input_data.bloodPressure,
            input_data.skinThickness, input_data.insulin, input_data.bmi,
            input_data.diabetesPedigree, input_data.age
        ]
        
        # Make prediction
        prediction = diabetes_model.predict([features])[0]
        
        # Handle probability calculation
        try:
            probability = diabetes_model.predict_proba([features])[0][1]
        except Exception as e:
            logger.warning(f"Could not calculate probability for diabetes model: {str(e)}")
            # If predict_proba is not available, use a default probability
            probability = 0.5 if prediction == 1 else 0.0
        
        # Generate message based on prediction
        message = "High risk of diabetes detected." if prediction == 1 else "Low risk of diabetes detected."
        
        logger.info(f"Diabetes prediction made: {prediction} with probability {probability}")
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(probability),
            message=message
        )
    except Exception as e:
        logger.error(f"Error in diabetes prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/cancer", response_model=PredictionResponse)
async def predict_cancer(input_data: CancerInput):
    if cancer_model is None:
        logger.error("Cancer model not loaded")
        raise HTTPException(status_code=503, detail="Cancer model not available")
    
    try:
        # Convert input data to list for model prediction
        features = [
            input_data.radius_mean, input_data.texture_mean, input_data.perimeter_mean,
            input_data.area_mean, input_data.smoothness_mean, input_data.compactness_mean,
            input_data.concavity_mean, input_data.concave_points_mean, input_data.symmetry_mean,
            input_data.fractal_dimension_mean, input_data.radius_se, input_data.texture_se,
            input_data.perimeter_se, input_data.area_se, input_data.smoothness_se,
            input_data.compactness_se, input_data.concavity_se, input_data.concave_points_se,
            input_data.symmetry_se, input_data.fractal_dimension_se, input_data.radius_worst,
            input_data.texture_worst
        ]
        
        # Make prediction
        prediction = cancer_model.predict([features])[0]
        
        # Handle probability calculation
        try:
            probability = cancer_model.predict_proba([features])[0][1]
        except Exception as e:
            logger.warning(f"Could not calculate probability for cancer model: {str(e)}")
            # If predict_proba is not available, use a default probability
            probability = 0.5 if prediction == 1 else 0.0
        
        # Generate message based on prediction
        message = "High risk of cancer detected." if prediction == 1 else "Low risk of cancer detected."
        
        logger.info(f"Cancer prediction made: {prediction} with probability {probability}")
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(probability),
            message=message
        )
    except Exception as e:
        logger.error(f"Error in cancer prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
async def chat(input_data: ChatInput):
    if model is None:
        logger.error("Chat model not available")
        raise HTTPException(status_code=503, detail="Chat functionality not available")
    
    try:
        logger.info(f"Received chat message: {input_data.message}")
        
        # Create chat context
        chat = model.start_chat(history=[])
        
        # Generate response
        response = chat.send_message(input_data.message)
        
        logger.info("Generated chat response successfully")
        
        return ChatResponse(response=response.text)
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        # Return a more user-friendly error message
        return ChatResponse(response="I'm sorry, I encountered an error processing your request. Please try again later.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
