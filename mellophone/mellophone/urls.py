"""mellophone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('api/', include('backend.urls')),

    # Serving the favicon like this is unecessary, but prevents a warning when
    # loading an HTTP route like /api/
    path('favicon.ico', serve, kwargs={
        'document_root': settings.STATIC_ROOT,
        'path': 'favicon.ico'
    }),

    # Simple method to serve the default frontend from anywhere if no previous
    # route matches
    re_path(r"", serve, kwargs={
        'document_root': settings.STATIC_ROOT,
        'path': 'index.html'
    }),
]
