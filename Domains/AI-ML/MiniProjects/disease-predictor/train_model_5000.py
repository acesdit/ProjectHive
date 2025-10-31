import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

# Load the dataset
df = pd.read_csv('disease_symptoms_5000.csv')

# Prepare data
X = df['symptoms']
y = df['disease']

# Create a pipeline for vectorization and classification
model = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', MultinomialNB())
])

# Train the model
model.fit(X, y)

# Save the trained model
joblib.dump(model, 'disease_predictor_model_5000.pkl')

print("Model trained and saved as 'disease_predictor_model_5000.pkl'.")
