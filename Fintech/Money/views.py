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
import matplotlib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# Create your views here.

def index(request):
    # context= {
    #     'UsersOfApp': UserOfApp.objects.all()
    #     # 'cycles': Cycle.objects.all()
    #     # 'stands': Stand.objects.all()
    #     # 'logs': Log.objects.all()
    # }
    return redirect(showlogin)
def plott(li, name, l2):
    k = dict()
    for i in set(li):
        res = 0
        for j in range(len(li)):
            if i == li[j]:
                res += l2[j]
        k[i] = res
    sumi = 0
    for i in k.values():
        sumi += i
    sizes = []
    labels = []
    for i in k.keys():
        sizes.append(int((k[i]/sumi) * 360))
        labels.append(i)
    labels = tuple(labels)
    explode = (0, 0.1, 0, 0)  # only "explode" the 2nd slice (i.e. 'Hogs')
    fig1, ax1 = plt.subplots()
    ax1.pie(sizes, labels=labels, autopct='%1.1f%%', shadow=True, startangle=90)
    ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
#     plt.show()
    plt.savefig("Money/static/images/" + name + ".jpeg", format='jpeg')
    plt.clf()

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
        return render(request,'Money/login.html', {'registered' : True})
    else:
        return HttpResponse(json.dumps(["True"]), content_type='application/json')

# def get_percent(u):
#     return
#     {
#     'food' :  100*df['Food'][u] / df['Total Expense'][u],
#     'elec': 100 * df['Electronics'][u] / df['TotalExpense'][u],
#     'cloth' : 100 * df['Clothes'][u] / df['Total Expense'][u],
#     'health': 100 * df['Health'][u] / df['Total Expense'][u],
#     'medicine' : 100 * df['Medicine'][u] / df['Total Expense'][u],
#     'ent' : 100 * df['Entertainment'][u] / df['Total Expense'][u]
#     }

def logmeout(request):
    logout(request)
    return render(request, 'Money/home.html')

def authenticateuser(request):
    if request.method == 'POST':
        device = request.POST['device'].split(" ")[0]
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)
        print(email,password,"\n\n\n\n\n\n\n\n\n\n")
        # login(request, user)
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
    else:
        return render(request, 'Money/home.html')

def get_percent(u,df):
    t = {'food' :  100*df['Food'][u]/df['Total Expense'][u],
    'elec': 100*df['Electronics'][u]/df['Total Expense'][u],
    'cloth' : 100*df['Clothes'][u]/df['Total Expense'][u],
    'health' : 100*df['Health'][u]/df['Total Expense'][u],
    'medicine' : 100*df['Medicine'][u]/df['Total Expense'][u],
    'ent' : 100*df['Entertainment'][u]/df['Total Expense'][u]}
    return [t, float(df['Savings'][u][:5])]

barWidth = 0.4

def calling(u):
    df = pd.read_csv('/Users/adityachavan/Documents/GitHub/MoneyMee/Fintech/Money/static/wohoo_data.csv')
    df.sum()[0]
    bars1 = list(get_percent(u,df)[0].values())
    bars2 = [100*df.sum(axis=0)[i]/df.sum()['Total Expense'] for i in range(3,9)]
    r1 = np.arange(len(bars1))
    r2 = [x + barWidth for x in r1]
    r3 = [x + barWidth for x in r2]

    plt.bar(r1, bars1, color='r', width=barWidth, edgecolor='white', label='User')
    plt.bar(r2, bars2, color='b', width=barWidth, edgecolor='white', label='World Avg')


    plt.xlabel('Spending', fontweight='bold')
    plt.xticks([r + barWidth for r in range(len(bars1))], ['Food', 'Electronics', 'Clothes', 'Health', 'Medicine', 'Entertainment'])
    print('savings percent', get_percent(u,df)[1])

    plt.legend()
    plt.savefig('Money/static/images/individual.jpeg',format='jpeg')
    plt.clf()
    return get_percent(u,df)[1]

def summary(request):
    print('summary')
    uid = request.user
    aid = BankAccount.objects.filter(uid=uid)
    l = []
    for i in aid:
        for j in Transaction.objects.filter(aid=i.aid):
            l.append(j)
    deposittypes = []
    withdrawtypes = []
    deposittypesamount = []
    withdrawtypesamount = []
    for i in l:
        if i.deposit == True:
            deposittypes.append(str(i.type))
            deposittypesamount.append(i.amount)
        else:
            withdrawtypes.append(str(i.type))
            withdrawtypesamount.append(i.amount)
    deposittypes_set = set(deposittypes)
    withdrawtypes_set = set(withdrawtypes)
    plott(deposittypes, 'deposit', deposittypesamount)
    plott(withdrawtypes, 'withdraw', withdrawtypesamount)
    print('\n\n\n\n\n\n\n\n')
    print('deposittypes', deposittypes)
    print('\n\n\n\n\n\n\n\n')
    print('deposittypes_set', deposittypes_set)
    print('\n\n\n\n\n\n\n\n')
    print('withdrawtypes', withdrawtypes)
    print('\n\n\n\n\n\n\n\n')
    print('withdrawtypes_set', withdrawtypes_set)
    print('\n\n\n\n\n\n\n\n')
    print(l)
    print("asdsafasf",uid)
    m = calling(request.user.id)
    if m > 20:
        m = 'You have A Grade Credit Score'
        x = True
    else:
        m = 'Your Credit Score is below Average'
        x = False
    return render(request, 'Money/summary.html',{'transaction': l, 'savings_per': m, 'credit_app': x})

def creditreg(request):
    c = CreditApplication(uid = request.user)
    c.save()
    return render(request, 'Money/credit_success.html')

# def trial(request):
#     pass
def showapi(request):
    return render(request,'Money/api.html')

def fromapi(BankAccount_id , deposit, amount, type_id):
    # aid , deposit, amount, type
    ba = BankAccount.objects.filter(aid=BankAccount_id)[0]
    ty = Type.objects.filter(tid=type_id)[0]
    t = Transaction(aid = ba, deposit = deposit, amount=amount, type = ty)
    t.save()
    val = ba.balance
    if deposit == True:
        ba.balance += amount
    else :
        ba.balance -= amount
    ba.save()
    return redirect(showapi)
    # return HttpResponse(json.dumps(["True"]), content_type='application/json')

def doit(request):
    return fromapi(int(request.POST['BankAccount_id']) , bool(int(request.POST['deposit'])), float(request.POST['amount']), int(request.POST['type_id']))
