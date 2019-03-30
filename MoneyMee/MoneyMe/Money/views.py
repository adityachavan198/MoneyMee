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
