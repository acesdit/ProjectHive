**Contributor:** shravanidorle

# Disease Predictor Web Service

## 🩺 Project Overview

This is a simple Flask-based web service that utilizes a pre-trained machine learning model to predict a disease based on a list of symptoms provided by the user. It provides both a simple web interface (assuming the necessary templates exist) and a dedicated API endpoint for programmatic access.

---

## ✨ Features

- **RESTful API Endpoint:** A dedicated `/predict` endpoint for JSON-based predictions.
- **Machine Learning Integration:** Uses `joblib` to load and utilize a pre-trained model.
- **Web Interface:** Serves simple front-end pages (`/`, `/about`, `/services`) using Flask templating (requires `index.html`, `about.html`, and `services.html`).

---

## 🛠️ Prerequisites

Before running the application, ensure you have the following installed:

- **Python 3.x**
- **Flask**
- **joblib**

---

## 🚀 Setup and Installation

### 1. File Structure

Your project directory should be structured as follows:

disease-predictor/ ├── app.py ├── disease_predictor_model_5000.pkl <-- Your trained model file (REQUIRED) ├── templates/ │ ├── index.html <-- Home page template (REQUIRED) │ ├── about.html <-- About page template (REQUIRED) │ └── services.html <-- Services page template (REQUIRED) └── README.md

### 2. Install Dependencies

You can install the required Python packages using `pip`:

```bash
pip install Flask joblib

```
