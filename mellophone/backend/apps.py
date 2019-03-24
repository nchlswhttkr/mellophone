"""
This declare the backend application for Django to use.
"""

from django.apps import AppConfig


class BackendConfig(AppConfig):
    """
    See https://docs.djangoproject.com/en/2.1/ref/applications
    """
    name = 'backend'
