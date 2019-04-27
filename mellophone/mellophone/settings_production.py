# pylint: disable=unused-wildcard-import,wildcard-import

from mellophone.settings_default import *

DEBUG = False

ALLOWED_HOSTS = ['mellophone.pink']

SECURE_CONTENT_TYPE_NOSNIFF = True

SECURE_BROWSER_XSS_FILTER = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

X_FRAME_OPTIONS = 'DENY'
