import torch
import torchvision.models as models

models.load_state_dict(torch.load('E:\Stock_Price_Predictor\Zomato_Stock_Model_With_Test_Loss0.004215325214969578.pth+'))
models.eval()
print(models)
