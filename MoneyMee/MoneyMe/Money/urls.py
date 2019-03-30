from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    path("",views.index, name="index"),
    path('register/',views.showregister,name='show_register'),
    path('register/',views.registeruser,name='register_user'),
    path('login/', views.authenticate, name='login'),
]
