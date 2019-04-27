# pylint: disable=unused-wildcard-import,wildcard-import

"""
Please try and avoid modifying this file where possible, doing so may cause
different behaviours between local (development) and production environments.

Instead consider modifying the base (default) config. Some features security
features are disabled here for ease of development.
"""

from mellophone.settings_default import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

SESSION_COOKIE_SECURE = False

CSRF_COOKIE_SECURE = False

SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
