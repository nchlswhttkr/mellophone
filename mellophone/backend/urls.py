from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='GET /'),
    path('sign-in', views.sign_in, name='POST /sign-in'),
    path('sign-up', views.sign_up, name='POST /sign-up'),
    path('sign-out', views.sign_out, name='POST /sign-out'),
    path('whoami', views.whoami, name='GET /whoami'),
]
