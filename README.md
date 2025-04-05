# IllnessInsight

An innovative, AI-powered platform designed to assist users in predicting the likelihood of various diseases based on their health parameters. This project leverages advanced machine learning models and cutting-edge generative AI technology to provide accurate predictions and personalized assistance.

## Features

- **Heart Disease Prediction**: Analyze critical health metrics like cholesterol levels, blood pressure, and heart rate to predict the risk of heart disease.
- **Diabetes Prediction**: Evaluate factors such as glucose levels, BMI, and insulin levels to determine the possibility of diabetes.
- **Cancer Disease Prediction**: Utilize voice-related biomarkers and other health parameters to predict cancer disease.
- **AI-Powered Chat Assistance**: Powered by Google's Gemini AI, this feature acts as your virtual healthcare assistant.

## Tech Stack

### Backend
- FastAPI (Python)
- Scikit-learn
- Google Generative AI (Gemini)
- WebSocket for real-time chat

### Frontend
- React with TypeScript
- Material-UI
- Axios for API calls
- WebSocket for real-time chat

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file with your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the navigation menu to access different prediction tools
3. Enter the required health parameters in the forms
4. Get instant predictions and insights
5. Use the chat assistant for general health-related questions

## API Documentation

The backend provides the following endpoints:

- `POST /predict/heart-disease`: Heart disease prediction
- `POST /predict/diabetes`: Diabetes prediction
- `POST /predict/cancer`: Cancer prediction
- `WebSocket /ws/chat`: Real-time chat with AI assistant

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI for providing the chat functionality
- Scikit-learn for machine learning models
- Material-UI for the beautiful UI components 