import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset
df = pd.read_csv("healthcare_fraud_dataset.csv")

# Basic info
print(df.info())
print(df.describe())

# Null value check
print("\nNull values per column:")
print(df.isnull().sum())

# Visualize outliers
columns = ['Claim_Amount', 'Number_of_Claims', 'Avg_Patient_Age']
for col in columns:
    sns.boxplot(x=df[col])
    plt.title(f"Boxplot of {col}")
    plt.show()

# Outlier detection using IQR
for col in columns:
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = df[(df[col] < lower) | (df[col] > upper)]
    print(f"\nOutliers in {col}: {len(outliers)} rows")

# OLAP Slice Example
print("\nOLAP Slice - Fraudulent claims by high claim amount:")
filtered = df[(df['Fraud_Flag'] == 1) & (df['Claim_Amount'] > 15000)]
print(filtered.head())
