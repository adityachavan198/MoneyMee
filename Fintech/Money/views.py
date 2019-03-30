from django.http import *
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
# from django.http import HttpResponse
from django.shortcuts import render, redirect
# from django.contrib.auth import login, authenticate
# from .forms import SignupForm
# from django.contrib.auth.models import User
from django.core.mail import EmailMessage
import json
from random import randint
# Create your views here.

def index(request):
    # context= {
    #     'UsersOfApp': UserOfApp.objects.all()
    #     # 'cycles': Cycle.objects.all()
    #     # 'stands': Stand.objects.all()
    #     # 'logs': Log.objects.all()
    # }
    return render(request, "Money/index.html")

def showregister(request):
    return render(request,'Money/register.html')
    
def showlogin(request):
    return render(request,'Money/login.html')

def registeruser(request):
    device = request.POST['device'].split(" ")[0]
    email = request.POST['email']
    password = request.POST['password']
    first_name = request.POST['fname']
    last_name = request.POST['lname']
    phone = request.POST['phone']
    user = UserOfApp.objects.create_user(username=email,email=email,password=password,first_name=first_name, last_name=last_name,phone=phone)
    user.save()

    if device == 'web':
        return render(request,'Money/login.html')
    else:
        return HttpResponse(json.dumps(["True"]), content_type='application/json')

def authenticateuser(request):
    device = request.POST['device'].split(" ")[0]
    email = request.POST['email']
    password = request.POST['password']
    user = authenticate(username=email, password=password)
    login(request, user)
    if user is not None:
        login(request, user)
        if device == 'web':
            return render(request, 'Money/home.html', {})
        else:
            return HttpResponse(json.dumps(["True"]), content_type='application/json')

    else:
        if device == 'web':
            return render(request, 'Money/login.html', {'loginfail' : True })
        else:
            return HttpResponse(json.dumps(["False"]), content_type='application/json')
