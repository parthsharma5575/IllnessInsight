# Importing the necessary libraries
import streamlit as st
import pickle
import numpy as np
import os
import google.generativeai as genai

# Set up the Google API key environment variable
os.environ['GOOGLE_API_KEY'] = "AIzaSyAPrO5G4SUuY37_LCOlFW-bFwANfK6RFVI"

# Configure the Gemini API with your API key
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

# Initialize the chat model
chat_model = genai.GenerativeModel('gemini-2.0-flash')

# Set page configuration
st.set_page_config(page_title="IllnessInsight", layout="wide")

# Sidebar for navigation
st.sidebar.title("Navigation")
selected = st.sidebar.radio("Choose the disease", [ 'About','Heart Disease', 'Diabetes Prediction', 'Cancer Disease', 'Chat Assistance'])

# Load models
hdmodel = pickle.load(open('models/heart_model.sav', 'rb'))
diabetesmodel = pickle.load(open('models/diabetes_model.sav', 'rb'))
cancersmodel = pickle.load(open('models/cancer_model.sav', 'rb'))

# About Page
if selected == 'About':
    st.title("About the Project: IllnessInsight")
    
    st.write("""
    Welcome to the **IllnessInsight**, an innovative, AI-powered platform designed to assist users in predicting the likelihood of various diseases based on their health parameters. This project leverages advanced machine learning models and cutting-edge generative AI technology to provide accurate predictions and personalized assistance.
    """)

    st.subheader("Key Features:")
    st.markdown("""
    ✅ **Heart Disease Prediction**  
    Analyze critical health metrics like cholesterol levels, blood pressure, and heart rate to predict the risk of heart disease. The model helps users take proactive steps toward heart health.

    ✅ **Diabetes Prediction**  
    Evaluate factors such as glucose levels, BMI, and insulin levels to determine the possibility of diabetes. This feature empowers users with actionable insights for managing their lifestyle and diet.

    ✅ **Cancer Disease Prediction**  
    Utilize voice-related biomarkers and other health parameters to predict cancer disease. The model provides early detection capabilities, enabling timely intervention.

    ✅ **AI-Powered Chat Assistance**  
    Powered by Google's Gemini AI, this feature acts as your virtual healthcare assistant. Ask questions about diseases, symptoms, or general health advice, and receive intelligent responses tailored to your needs.
    """)

    st.write("---")
    st.write("Feel free to explore the various features and take charge of your health today! 🌟")

# Heart Disease Prediction Page
elif selected == 'Heart Disease':
    st.title("Heart Disease Prediction")
    st.write("Please provide the details:")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        age = st.text_input("Enter your age:")
        gender = st.text_input("For male, write 1 or 0 for female:")
        cp = st.text_input("Do you have Chest pain? (1 for yes, 0 for no):")
        trestbps = st.text_input("Enter your resting blood pressure:")
        chol = st.text_input("Enter your cholesterol level:")
        fbs = st.text_input("Enter your fasting blood sugar:")
        restecg = st.text_input("Enter your resting electrocardiographic results (0, 1, or 2):")

    with col2:
        thalach = st.text_input("Enter your maximum heart rate:")
        exang = st.text_input("Do you have exercise-induced angina? (1 for yes, 0 for no):")
        oldpeak = st.text_input("Enter your old peak:")
        slope = st.text_input("Enter your slope (0, 1, or 2):")
        ca = st.text_input("Enter your number of major vessels (0, 1, 2, 3, or 4):")
        thal = st.text_input("Enter your thalassemia (0, 1, 2, or 3):")

    with col3:
        # Display image
        st.image('images/heart.png', width=200)

    if st.button('Predict'):
        try:
            data = [age, gender, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]
            data_array = np.array(data, dtype=float).reshape(1, -1)
            prediction = hdmodel.predict(data_array)
            if (prediction==0):
                st.success(f"The prediction is: You are not prone to Heart Disease")
            else:
                st.success(f"The prediction is: Sorry, You are more prone to Heart Disease")
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

# Diabetes Prediction Page
elif selected == 'Diabetes Prediction':
    st.title("Diabetes Prediction")
    
    col1, col2, col3= st.columns(3)
    
    with col1:
        Pregnancies = st.text_input('Number of Pregnancies:')
        SkinThickness = st.text_input('Skin Thickness value:')
        DiabetesPedigreeFunction = st.text_input('Diabetes Pedigree Function value:')
    
    with col2:
        Glucose = st.text_input('Glucose Level:')
        Insulin = st.text_input('Insulin Level:')
        Age = st.text_input('Age:')
    
    with col3:
        BloodPressure = st.text_input('Blood Pressure value:')
        BMI = st.text_input('BMI:')

    if st.button('Predict'):
        try:
            data = [Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age]
            data_array = np.array(data, dtype=float).reshape(1, -1)
            prediction = diabetesmodel.predict(data_array)
            if (prediction[0]==0):
                st.success(f"The prediction is: You are not prone to Diabetes")
            else:
                st.success(f"The prediction is: Sorry, You are more prone to Diabetes")
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

# Cancer's Disease Prediction Page
elif selected == 'Cancer Disease':
    st.title("Cancer Disease Prediction")
    
    col1, col2, col3, col4, col5 = st.columns(5)  
    
    with col1:
        fo = st.text_input('Fo (Hz):')
        RAP = st.text_input('RAP:')
        APQ3 = st.text_input('APQ3:')
        HNR = st.text_input('HNR:')
        D2 = st.text_input('D2:')
    
    with col2:
        fhi = st.text_input('Fhi (Hz):')
        PPQ = st.text_input('PPQ:')
        APQ5 = st.text_input('APQ5:')
        RPDE = st.text_input('RPDE:')
        PPE = st.text_input('PPE:')
    
    with col3:
        flo = st.text_input('Flo (Hz):')
        DDP = st.text_input('DDP:')
        APQ = st.text_input('APQ:')
        DFA = st.text_input('DFA:')
    
    with col4:
        Jitter_percent = st.text_input('Jitter (%):')
        Shimmer = st.text_input('Shimmer:')
        DDA = st.text_input('DDA:')
        spread1 = st.text_input('spread1:')
    
    with col5:
        Jitter_Abs = st.text_input('Jitter (Abs):')
        Shimmer_dB = st.text_input('Shimmer (dB):')
        NHR = st.text_input('NHR:')
        spread2 = st.text_input('spread2:')

    if st.button('Predict'):
        try:
            data = [fo, fhi, flo, Jitter_percent, Jitter_Abs, RAP, PPQ, DDP, Shimmer, Shimmer_dB, APQ3, APQ5, APQ, DDA, NHR, HNR, RPDE, DFA, spread1, spread2, D2, PPE]
            data_array = np.array(data, dtype=float).reshape(1, -1)
            prediction = cancersmodel.predict(data_array)
            if (prediction[0]==0):
                st.success(f"The prediction is: You are not prone to Cancer")
            else:
                st.success(f"The prediction is: Sorry, You are more prone to Cancer")
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

# Chat Assistance Page
elif selected == 'Chat Assistance':
    st.title("Healthcare Assistant 🏥")

    # Initialize chat session
    if "chat_session" not in st.session_state:
        st.session_state.chat_session = chat_model.start_chat(history=[])
        st.session_state.messages = [{"role": "assistant", "content": "Hello! I'm your Health assistant. Ask me about health tips or about diseases!"}]
    
    # Display chat history
    chat_container = st.container(height=500)
    with chat_container:
        for message in st.session_state.messages:
            with st.chat_message(message["role"]):
                st.markdown(message["content"])
    
    # Handle user input
    if prompt := st.chat_input("Type your question..."):
        try:
            # Add user message
            st.session_state.messages.append({"role": "user", "content": prompt})
            
            # Stream response
            with st.spinner("Thinking..."):
                response = st.session_state.chat_session.send_message(prompt)
                full_response = response.text
            
            # Add bot response
            st.session_state.messages.append({"role": "assistant", "content": full_response})
            
            # Rerun to update display
            st.rerun()
            
        except Exception as e:
            st.error(f"Error generating response: {str(e)}")

# Add a footer
st.sidebar.markdown("---")
st.sidebar.info("Made by: Mokshit Kaushik")
st.sidebar.text("Version 0.73")
