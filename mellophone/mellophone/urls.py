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
]

# In production, nginx serves static content (see config/nginx-mellophone), but
# in development we need Django to serve it.
if settings.DEBUG:
    urlpatterns += [
        path('favicon.png', serve, kwargs={
            'document_root': settings.STATIC_ROOT,
            'path': 'favicon.png'
        }),
        re_path(r"", serve, kwargs={
            'document_root': settings.STATIC_ROOT,
            'path': 'index.html'
        }),
    ]
