from django.db import models

# Create your models here.
class Purchase(models.Model):
    trx_date = models.DateTimeField(auto_now_add=True)
    coupon = models.IntegerField()
    user_id = models.CharField(max_length=200)
    amount = models.IntegerField()

class PurchaseDetail(models.Model):
    purchase_id = models.ForeignKey("Purchase", on_delete=models.CASCADE)
    product_id = models.ForeignKey("Product", on_delete=models.CASCADE)
    qty = models.IntegerField()

class Product(models.Model):
    product_name = models.CharField(max_length=200)
    product_price = models.IntegerField()
