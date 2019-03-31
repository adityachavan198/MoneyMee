from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    path("",views.index, name="index"),
    path('register/',views.showregister,name='showregister'),
    path('registeruser/',views.registeruser,name='registeruser'),
    path('loginuser/', views.authenticateuser, name='loginuser'),
    path('login/', views.showlogin, name='showlogin'),
    path('summary/', views.summary, name='summary'),
    path('showapi/',views.showapi,name='showapi'),
    path('api/',views.doit,name='fromapi'),
    path('logout/', views.logmeout, name='logout'),
    path('creditreg/', views.creditreg, name='creditreg')
    # path('showsummary/', views.showsumary, name='showsummary')
    # path('trial/', views.trial, name='trial')
    # path('home/', views.home, name='home'),
]
