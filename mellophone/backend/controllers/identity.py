import re
import json
import base64
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from backend.views import GenericViews
from backend.serializers import serialize_user
from backend.services.identity import IdentityService
from backend.services.user import UserService


class IdentityController:
    """
    All requests matching /api/identity/... should be routed through here, and
    connect a request with its appropriate action, usually the IdentityService.
    """

    def sign_in(self, request):
        """
        Attempt to initiate an authenticated session
        """
        credentials = re.fullmatch(r"Basic (.*)", request.META["HTTP_AUTHORIZATION"])[1]
        email, password = base64.b64decode(credentials.encode()).decode().split(":")

        user = IdentityService.sign_in(request, email=email, password=password)
        return JsonResponse({"user": serialize_user(user)}, status=200)

    def sign_up(self, request):
        """
        Create a new user and start an authenticated session with them
        """
        credentials = re.fullmatch(r"Basic (.*)", request.META["HTTP_AUTHORIZATION"])[1]
        email, password = base64.b64decode(credentials.encode()).decode().split(":")
        body = json.loads(request.body.decode("utf-8"))
        first_name = body["firstName"] if "firstName" in body else ""
        last_name = body["lastName"] if "lastName" in body else ""

        user = IdentityService.sign_up(request, email, password, first_name, last_name)
        return JsonResponse({"user": serialize_user(user)}, status=201)

    def sign_out(self, request):
        """
        End the current session, succeeding even if one does not exist
        """
        IdentityService.sign_out(request)
        return JsonResponse({}, status=200)

    @method_decorator(ensure_csrf_cookie)
    def whoami(self, request):
        """
        Return information about the session user, or an empty object if there
        is no user
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return JsonResponse({}, status=200)
        return JsonResponse({"user": serialize_user(user)}, status=201)
