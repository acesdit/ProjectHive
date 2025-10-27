import torch
import torch.nn as nn

class SimpleLSTMCell(nn.Module):
    def __init__(self, input_size, hidden_size):
        super(SimpleLSTMCell, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size

        # Each gate gets the combined input of x_t and h_{t-1}
        self.forget_gate = nn.Linear(input_size + hidden_size, hidden_size)
        self.input_gate = nn.Linear(input_size + hidden_size, hidden_size)
        self.candidate_layer = nn.Linear(input_size + hidden_size, hidden_size)
        self.output_gate = nn.Linear(input_size + hidden_size, hidden_size)

    def forward(self, x_t, h_prev, c_prev):
        # Concatenate input at current time step and previous hidden state
        combined = torch.cat((x_t, h_prev), dim=1)

        # Forget gate: decides what information to throw away from the cell state
        f_t = torch.sigmoid(self.forget_gate(combined))  # f(t) in diagram

        # Input gate: decides which values to update
        i_t = torch.sigmoid(self.input_gate(combined))   # i(t) in diagram

        # Candidate values: creates new candidate values that could be added to the state
        c_hat_t = torch.tanh(self.candidate_layer(combined))  # ĉ(t) in diagram

        # Update cell state: combine old cell state and new candidate
        c_t = f_t * c_prev + i_t * c_hat_t  # C_t in diagram

        # Output gate: decides what part of the cell state makes it to the output
        o_t = torch.sigmoid(self.output_gate(combined))  # o(t) in diagram

        # New hidden state: filtered cell state
        h_t = o_t * torch.tanh(c_t)  # h_t in diagram

        return h_t, c_t

# Example usage:
input_size = 11   # Number of input features
hidden_size = 50  # Number of hidden units
batch_size = 32   # Number of samples in a batch

cell = SimpleLSTMCell(input_size, hidden_size)
# Random input, previous hidden state, previous cell state
x_t = torch.randn(batch_size, input_size)
h_prev = torch.zeros(batch_size, hidden_size)
c_prev = torch.zeros(batch_size, hidden_size)

# Forward pass through the cell
h_t, c_t = cell(x_t, h_prev, c_prev)
