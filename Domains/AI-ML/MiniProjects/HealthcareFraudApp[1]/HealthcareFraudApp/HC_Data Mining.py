import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix

# Load dataset
df = pd.read_csv("healthcare_fraud_dataset.csv")

# Correlation matrix
numeric_df = df.select_dtypes(include=['number'])
plt.figure(figsize=(10, 6))
sns.heatmap(numeric_df.corr(), annot=True, cmap='coolwarm')
plt.title("Correlation Matrix")
plt.show()

# KMeans Clustering
kmeans = KMeans(n_clusters=2, random_state=0)
kmeans.fit(numeric_df.drop('Fraud_Flag', axis=1))
df['Cluster'] = kmeans.labels_
print("Silhouette Score:", silhouette_score(numeric_df.drop('Fraud_Flag', axis=1), kmeans.labels_))

# Logistic Regression
X = df[['Claim_Amount', 'Number_of_Claims', 'Avg_Patient_Age']]
y = df['Fraud_Flag']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
