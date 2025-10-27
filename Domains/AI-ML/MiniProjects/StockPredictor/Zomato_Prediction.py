import torch
import torch.nn as nn
import pandas as pd
from tqdm.auto import tqdm
from torch.utils.data import TensorDataset, DataLoader
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import matplotlib.pyplot as plt

# --- Data Loading and Preprocessing ---

df = pd.read_csv('Zomato_Dataset.csv')
df['Date'] = pd.to_datetime(df['Date'], dayfirst=True)
df = df.sort_values('Date')

# Add useful date features
df['DayOfWeek'] = df['Date'].dt.dayofweek
df['Month'] = df['Date'].dt.month
df['DayOfMonth'] = df['Date'].dt.day
df['DaysSinceStart'] = (df['Date'] - df['Date'].min()).dt.days

# Select features and target
feature_cols = ['Open', 'High', 'Low', 'Close', 'Volume', 'DayOfWeek', 'Month', 'DayOfMonth', 'DaysSinceStart']
features = df[feature_cols].values.astype('float32')
target = df['Close'].values.astype('float32').reshape(-1, 1)

# --- MinMax Scaling ---
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

features_scaled = scaler_X.fit_transform(features)
target_scaled = scaler_y.fit_transform(target)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# --- Sliding Window Batching Function ---
def create_sequences(features, target, seq_length):
    xs = []
    ys = []
    for i in range(len(features) - seq_length):
        x_seq = features[i:i+seq_length]
        y_seq = target[i+seq_length]
        xs.append(x_seq)
        ys.append(y_seq)
    return torch.tensor(np.array(xs), dtype=torch.float32), torch.tensor(np.array(ys), dtype=torch.float32)

seq_length = 30
X, y = create_sequences(features_scaled, target_scaled, seq_length)

# --- Train/Test Split ---
train_test_split = 0.8
train_size = int(len(X) * train_test_split)
X_train, y_train = X[:train_size], y[:train_size]
X_test, y_test = X[train_size:], y[train_size:]

batch_size = 2
hidden_units = 1024
input_units = len(feature_cols)

# --- DataLoader for batching ---
train_dataset = TensorDataset(X_train, y_train)
test_dataset = TensorDataset(X_test, y_test)
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, drop_last=True)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False, drop_last=False)

# --- Custom LSTM Cell Layer ---
class Single_Layer(nn.Module):
    def __init__(self, input_size, hidden_units):
        super().__init__()
        self.forget_gate = nn.Linear(input_size + hidden_units, hidden_units)
        self.input_gate = nn.Linear(input_size + hidden_units, hidden_units)
        self.candidate_layer = nn.Linear(input_size + hidden_units, hidden_units)
        self.output_gate = nn.Linear(input_size + hidden_units, hidden_units)

    def forward(self, x_t, h_prev, c_prev):
        combined = torch.cat((x_t, h_prev), dim=1)
        forget_t = torch.sigmoid(self.forget_gate(combined))
        input_t = torch.sigmoid(self.input_gate(combined))
        candidate_hat_t = torch.tanh(self.candidate_layer(combined))
        c_t = forget_t * c_prev + input_t * candidate_hat_t
        output_t = torch.sigmoid(self.output_gate(combined))
        h_t = output_t * torch.tanh(c_t)
        return h_t, c_t

# --- Stacked Custom LSTM Model ---
class LSTMModel(nn.Module):
    def __init__(self, input_units, hidden_units, seq_length):
        super().__init__()
        self.seq_length = seq_length
        self.hidden_units = hidden_units
        self.lstm1 = Single_Layer(input_units, hidden_units)
        self.relu1 = nn.ReLU()
        self.dropout1 = nn.Dropout(0.2)
        self.lstm2 = Single_Layer(hidden_units, hidden_units)
        self.relu2 = nn.ReLU()
        self.dropout2 = nn.Dropout(0.2)
        self.fc = nn.Linear(hidden_units, 1)

    def forward(self, x):
        batch_size = x.size(0)
        h1 = torch.rand(batch_size, self.hidden_units, device=x.device)
        c1 = torch.rand(batch_size, self.hidden_units, device=x.device)
        h2 = torch.rand(batch_size, self.hidden_units, device=x.device)
        c2 = torch.rand(batch_size, self.hidden_units, device=x.device)
        for t in range(self.seq_length):
            x_t = x[:, t, :]
            h1, c1 = self.lstm1(x_t, h1, c1)
            h1 = self.relu1(h1)
            h1 = self.dropout1(h1)
            h2, c2 = self.lstm2(h1, h2, c2)
            h2 = self.relu2(h2)
            h2 = self.dropout2(h2)
        out = self.fc(h2)
        return out
    
def accuracy_fn(y_true, y_pred):
    """
    Calculates accuracy by comparing predicted and true labels.

    Args:
        y_true (torch.Tensor): True labels, shape (batch_size,)
        y_pred (torch.Tensor): Raw logits or probabilities from the model, shape (batch_size, num_classes)

    Returns:
        float: Accuracy in percentage (0-100)
    """

    y_true = y_true.to(device)
    y_pred = y_pred.to(device)
    # Get predicted class indices (highest logit/probability per sample)
    y_pred_labels = y_pred.argmax()
    y_pred_labels = y_pred_labels.to(device)
    # Compare with true labels and sum correct predictions
    correct = (y_pred_labels == y_true).sum().item()
    # Calculate accuracy as a percentage
    accuracy = correct / len(y_true) * 100
    return accuracy

# def RMSELoss(yhat,y):
#     return torch.sqrt(torch.mean((yhat-y)**2))

# --- Training Setup ---
model = LSTMModel(input_units, hidden_units, seq_length).to(device)
loss_fn = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=0.0001)
epochs = 50

for epoch in tqdm(range(epochs), desc="Epochs"):
    model.train()
    train_loss = 0
    for xb, yb in tqdm(train_loader, desc=f"Train Batches (Epoch {epoch+1})", leave=False):
        xb, yb = xb.to(device), yb.to(device)
        optimizer.zero_grad()
        y_pred = model(xb)
        loss = loss_fn(y_pred, yb)
        loss.backward()
        optimizer.step()
        train_loss += loss.item() * xb.size(0)
    train_loss /= len(train_loader.dataset)

    model.eval()
    test_loss = 0
    with torch.no_grad():
        for xb, yb in tqdm(test_loader, desc=f"Test Batches (Epoch {epoch+1})", leave=False):
            xb, yb = xb.to(device), yb.to(device)
            y_pred = model(xb)
            loss = loss_fn(y_pred, yb)
            test_loss += loss.item() * xb.size(0)

    if (test_loss < 0.000224):
        print(f"Early stopping at epoch {epoch+1} with test loss {test_loss:.5f}")
        torch.save(model.state_dict(), f"Zomato_Stock_Model_With_Test_Loss{test_loss}_BatchSize{batch_size}_HiddenUnits{hidden_units}.pth")
        break    

    
    accuracy = accuracy_fn(y_test, y_pred)
    print(f"Epoch {epoch+1}/{epochs} | Train Loss: {train_loss:.5f} | Test Loss: {test_loss:.5f} ")

