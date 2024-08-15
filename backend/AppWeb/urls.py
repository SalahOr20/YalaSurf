from django.contrib import admin
from django.urls import path, include

from .views import register, login_view, logout_view

urlpatterns = [
    #####Urls for users#####
    path('user/register', register, name='register'),
    path('user/signin', login_view, name='login_view'),
    path('user/logout', logout_view, name='logout_view'),
]
