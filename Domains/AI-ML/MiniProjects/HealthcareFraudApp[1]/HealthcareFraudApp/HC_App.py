import streamlit as st
import pickle
import numpy as np
import pandas as pd

# Load model and encoders
with open("fraud_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("fraud_encoders.pkl", "rb") as encoder_file:
    encoders = pickle.load(encoder_file)
    provider_encoder = encoders["provider_encoder"]
    procedure_encoder = encoders["procedure_encoder"]
    diagnosis_encoder = encoders["diagnosis_encoder"]

# Title
st.title("🏥 Healthcare Fraud Detection System")
st.write("Predict whether a claim is potentially fraudulent.")

# Input fields
provider_id = st.selectbox("Provider ID", provider_encoder.classes_)
claim_amount = st.number_input("Claim Amount ($)", min_value=100.0, value=5000.0)
num_claims = st.number_input("Number of Claims", min_value=1, value=5)
avg_age = st.slider("Average Patient Age", 30, 90, 50)
procedure_code = st.selectbox("Procedure Code", procedure_encoder.classes_)
diagnosis_code = st.selectbox("Diagnosis Code", diagnosis_encoder.classes_)

if st.button("Detect Fraud"):
    provider_enc = provider_encoder.transform([provider_id])[0]
    procedure_enc = procedure_encoder.transform([procedure_code])[0]
    diagnosis_enc = diagnosis_encoder.transform([diagnosis_code])[0]

    input_data = np.array([[provider_enc, claim_amount, num_claims, avg_age, procedure_enc, diagnosis_enc]])
    prediction = model.predict(input_data)[0]

    if prediction == 1:
        st.error("⚠️ This claim is potentially fraudulent.")
    else:
        st.success("✅ This claim is likely legitimate.")
