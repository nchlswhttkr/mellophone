# pylint: disable=unused-wildcard-import,wildcard-import

from mellophone.settings_default import *

DEBUG = False

ALLOWED_HOSTS = ['mellophone.pink']

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_BROWSER_XSS_FILTER = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

X_FRAME_OPTIONS = 'DENY'

# nginx config makes this redundant, no harm in leaving it in though
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 604800  # 1 week
