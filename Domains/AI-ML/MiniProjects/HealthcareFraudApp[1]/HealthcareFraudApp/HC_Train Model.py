import pandas as pd
import numpy as np
import pickle

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load dataset
df = pd.read_csv("healthcare_fraud_dataset.csv")

# Encode categorical features
provider_encoder = LabelEncoder()
df["Provider_ID"] = provider_encoder.fit_transform(df["Provider_ID"])

procedure_encoder = LabelEncoder()
df["Procedure_Code"] = procedure_encoder.fit_transform(df["Procedure_Code"])

diagnosis_encoder = LabelEncoder()
df["Diagnosis_Code"] = diagnosis_encoder.fit_transform(df["Diagnosis_Code"])

X = df.drop("Fraud_Flag", axis=1)
y = df["Fraud_Flag"]

# Scale numerical features
scaler = StandardScaler()
X["Claim_Amount"] = scaler.fit_transform(X[["Claim_Amount"]])
X["Avg_Patient_Age"] = scaler.fit_transform(X[["Avg_Patient_Age"]])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Save model and encoders
with open("fraud_model.pkl", "wb") as file:
    pickle.dump(model, file)

with open("fraud_encoders.pkl", "wb") as file:
    pickle.dump({
        "provider_encoder": provider_encoder,
        "procedure_encoder": procedure_encoder,
        "diagnosis_encoder": diagnosis_encoder
    }, file)

print("✅ Model and encoders saved!")
