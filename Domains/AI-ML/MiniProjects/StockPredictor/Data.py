import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

# Load your existing dataset
file_path = 'Zomato_Dataset.csv'
df_existing = pd.read_csv(file_path)

# Convert 'Date' column to datetime (dayfirst=True because your dates are like '23-07-2021')
df_existing['Date'] = pd.to_datetime(df_existing['Date'], dayfirst=True)

# Find the last date in the existing dataset
last_date = df_existing['Date'].max()

# Define start date for new data download (day after last_date)
start_date = (last_date + timedelta(days=1)).strftime('%Y-%m-%d')

# Define end date as today
end_date = datetime.now().strftime('%Y-%m-%d')

# Define ticker symbol for Zomato on NSE
ticker = 'ZOMATO.NS'

# Download missing data including dividends and stock splits
new_data = yf.download(ticker, start=start_date, end=end_date, actions=True)

if new_data.empty:
    print("No new data to download. Dataset is up to date.")
else:
    # Reset index to have 'Date' as a column
    new_data.reset_index(inplace=True)

    # Rename columns to match your existing dataset format
    # Your existing columns: Date,Open,High,Low,Close,Adj Close,Volume
    # yfinance returns: Date, Open, High, Low, Close, Adj Close, Volume, Dividends, Stock Splits
    # We'll keep all columns for completeness; you can drop Dividends and Stock Splits if you want

    # Format 'Date' column to match your original format (dd-mm-yyyy)
    new_data['Date'] = new_data['Date'].dt.strftime('%d-%m-%Y')

    # Select columns to save (including Dividends and Stock Splits)
    cols_to_save = ['Date', 'Open', 'High', 'Low', 'Close', 'Adj Close', 'Volume', 'Dividends', 'Stock Splits']

    # If Dividends or Stock Splits are missing, fill them with zeros
    for col in ['Dividends', 'Stock Splits']:
        if col not in new_data.columns:
            new_data[col] = 0

    # Append new data to existing dataset
    df_combined = pd.concat([df_existing, new_data[cols_to_save]], ignore_index=True)

    # Save the combined dataset to a new CSV file
    output_file = 'Zomato-Dataset-Updated.csv'
    df_combined.to_csv(output_file, index=False)

    print(f"New data downloaded from {start_date} to {end_date} and appended.")
    print(f"Updated dataset saved as '{output_file}'.")
