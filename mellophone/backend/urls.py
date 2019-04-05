"""
Route controllers can be declared here, Django will call these as appropriate.

https://docs.djangoproject.com/en/dev/topics/http/urls#how-django-processes-a-request
"""

from django.urls import re_path

from backend.controllers.index import IndexController
from backend.controllers.identity import IdentityController
from backend.controllers.team import TeamController
from backend.controllers.meeting import MeetingController

urlpatterns = [
    re_path(
        r"^$",
        IndexController.process_request,
        name='backend /index'
    ),
    re_path(
        r"^identity",
        IdentityController.process_request,
        name='backend /identity'
    ),
    re_path(
        r"^teams",
        TeamController.process_request,
        name='backend /teams'
    ),
    re_path(
        r"^meetings",
        MeetingController.process_request,
        name="backend /meetings"
    )
]
