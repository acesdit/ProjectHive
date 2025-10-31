import pandas as pd
import random

# Define possible symptoms and diseases
symptoms_list = [
    'fever', 'cough', 'headache', 'body ache', 'weakness', 
    'shortness of breath', 'sore throat', 'runny nose', 
    'nausea', 'vomiting', 'chills', 'muscle pain'
]
diseases = ['Flu', 'Malaria', 'COVID-19', 'Cold', 'Allergy']

# Define mapping of symptoms to diseases
symptom_disease_map = {
    'fever': 'Flu',
    'cough': 'COVID-19',
    'headache': 'Flu',
    'body ache': 'Malaria',
    'weakness': 'Malaria',
    'shortness of breath': 'COVID-19',
    'sore throat': 'Cold',
    'runny nose': 'Allergy',
    'nausea': 'Malaria',
    'vomiting': 'Malaria',
    'chills': 'Flu',
    'muscle pain': 'Flu'
}

# Function to generate random symptoms
def generate_symptoms(num_symptoms=3):
    return ','.join(random.sample(symptoms_list, num_symptoms))

# Function to determine disease based on symptoms
def get_disease(symptoms):
    symptom_set = set(symptoms.split(','))
    disease_count = {}
    for symptom in symptom_set:
        disease = symptom_disease_map.get(symptom, 'Unknown')
        if disease != 'Unknown':
            if disease in disease_count:
                disease_count[disease] += 1
            else:
                disease_count[disease] = 1
    if disease_count:
        return max(disease_count, key=disease_count.get)
    return 'Unknown'

# Generate the dataset
num_records = 5000
data = []
for _ in range(num_records):
    symptoms = generate_symptoms()
    disease = get_disease(symptoms)
    data.append([symptoms, disease])

# Convert to DataFrame and save to CSV
df = pd.DataFrame(data, columns=['symptoms', 'disease'])
df.to_csv('disease_symptoms_5000.csv', index=False)

print("Dataset generated and saved as 'disease_symptoms_5000.csv'.")

