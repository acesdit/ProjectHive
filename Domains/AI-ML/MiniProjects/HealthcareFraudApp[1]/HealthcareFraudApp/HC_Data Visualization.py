import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
df = pd.read_csv("healthcare_fraud_dataset.csv")

# Set style
sns.set(style="whitegrid")

# Fraud count pie chart
fraud_counts = df['Fraud_Flag'].value_counts()
labels = ['Legitimate', 'Fraudulent']
colors = ['skyblue', 'salmon']

plt.figure(figsize=(6, 6))
plt.pie(fraud_counts, labels=labels, autopct='%1.1f%%', startangle=140, colors=colors)
plt.title("Fraudulent vs Legitimate Claims")
plt.show()

# Histogram of Claim Amount
plt.figure(figsize=(10, 5))
sns.histplot(data=df, x="Claim_Amount", hue="Fraud_Flag", kde=True, palette='Set2', bins=30)
plt.title("Claim Amount Distribution by Fraud Status")
plt.xlabel("Claim Amount")
plt.ylabel("Count")
plt.legend(title="Fraud Flag", labels=["Legitimate", "Fraudulent"])
plt.show()

# Boxplot of Age
plt.figure(figsize=(8, 5))
sns.boxplot(data=df, x="Fraud_Flag", y="Avg_Patient_Age", palette='pastel')
plt.title("Average Patient Age by Fraud Status")
plt.xlabel("Fraudulent (1) vs Legitimate (0)")
plt.ylabel("Average Age")
plt.show()
