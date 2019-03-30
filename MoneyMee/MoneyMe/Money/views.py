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
    return redirect(request,'Money/register.html')


def registeruser(request):
    device = request.POST['device']
    email = request.POST['email']
    password = request.POST['password']
    first_name = request.POST['fname']
    last_name = request.POST['lname']
    phone = request.POST['phone']
    user = UserOfApp.objects.create_user(email=email,password=password,first_name=first_name, last_name=last_name,phone=phone)
    user.save()
    if device == 'web':
        render(request,'Money/login.html')
    else:
        return HttpResponse(json.dumps(["True"]), content_type='application/json')

def authenticate(request):
    username = request.POST['username']
    password = request.POST['password']
    l = Student.objects.filter(username=username, password=password)
    if len(l):
        request.session['username'] = username
        return HttpResponseRedirect(reverse('showhomepage'))
    else:
        return HttpResponseRedirect(reverse('libraryindex'))
