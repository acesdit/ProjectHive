from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from .models import Purchase, PurchaseDetail, Product
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.cache import never_cache
from datetime import datetime
import json


# Create your views here.
def home(request):
    return render(request, 'main.html')

# def login(request):
#     return render(request, 'login.html')

@login_required(login_url='/login/')
def product(request):
    return render(request, 'product.html')

@never_cache
@login_required(login_url='/login/')
def history(request):
    purchase = Purchase.objects.filter(user_id=request.user)
    for row in purchase:
        timedelta = timezone.now() - row.trx_date
        timedelta_hrs = timedelta.total_seconds()/3600
        if (timedelta_hrs > 3):
            row.status = "Close"
        else:
            row.status = "Open"

    return render(request, 'history.html', {'history': purchase})

class LoginInterfaceView(LoginView):
    template_name = 'login.html'

class LogoutInterfaceView(LogoutView):
    template_name = 'logout.html'



# class HistoryView(TemplateView):
#     template_name = 'history.html'
#     extra_context={'history': Purchase.objects.all()}

@csrf_exempt
def checkout(request):
    if request.method == "POST":
        data = json.loads(request.body)

        purchase = Purchase()
        purchase.trx_date = timezone.now()
        purchase.coupon = data.get("coupon")
        purchase.amount = data.get("amount")
        purchase.user_id = request.user
        purchase.save()

        cart = data.get("cart")

        idx = 0
        for item in cart:
            detail = PurchaseDetail()
            detail.purchase_id = Purchase.objects.get(id = purchase.id)
            detail.product_id = Product.objects.get(id = idx+1)
            detail.qty = cart[idx]
            detail.save()
            idx +=1

    return JsonResponse({'success': True})