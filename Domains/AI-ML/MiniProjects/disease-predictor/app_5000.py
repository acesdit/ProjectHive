from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)
model = joblib.load('disease_predictor_model_5000.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data.get('symptoms', '')
    prediction = model.predict([symptoms])
    return jsonify({'disease': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
