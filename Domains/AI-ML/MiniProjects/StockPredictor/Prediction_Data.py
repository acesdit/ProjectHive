import torch
import torch.nn as nn

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
    
input_units = 1028     # Set to your actual input feature count
hidden_units = 1028   # Set to your training value
seq_length = 30      # Set to your training value

model = LSTMModel(input_units, hidden_units, seq_length)
model.load_state_dict(torch.load('E:\Stock_Price_Predictor\Zomato_Stock_Model_With_Test_Loss0.00022452198135156036_BatchSize2_HiddenUnits1028.pth'))  # Replace with your file name


for name, param in model.named_parameters():
    if 'weight' in name or 'bias' in name:
        print(f"{name}:\n{param.data}\n")
