from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    path("",views.index, name="index"),
    path('register/',views.showregister,name='showregister'),
    path('registeruser/',views.registeruser,name='registeruser'),
    path('login/', views.authenticateuser, name='login'),
    # path('home/', views.home, name='home'),
]
