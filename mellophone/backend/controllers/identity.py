import re
import json
import base64
from django.http.response import JsonResponse
from backend.views.generic import GenericViews
from backend.serializers import serialize_user


class IdentityController:
    """
    All requests matching /api/identity/... should be routed through here, and
    connect a request with its appropriate action, usually the IdentityService.
    """

    def __init__(self, identity_service, user_service):
        self._identity_service = identity_service
        self._user_service = user_service

    def sign_in(self, request):
        """
        Attempt to initiate an authenticated session
        """
        credentials = re.fullmatch(
            r"Basic (.*)", request.META['HTTP_AUTHORIZATION'])[1]
        email, password = base64.b64decode(
            credentials.encode()).decode().split(':')

        self._identity_service.sign_in(request, email=email, password=password)

        # It is not certain that authenticating will succeed
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        return JsonResponse({"user": serialize_user(user)}, status=200)

    def sign_up(self, request):
        """
        Create a new user and started an authenticated session with them
        """
        credentials = re.fullmatch(
            r"Basic (.*)", request.META['HTTP_AUTHORIZATION'])[1]
        email, password = base64.b64decode(
            credentials.encode()).decode().split(':')
        body = json.loads(request.body.decode("utf-8"))
        first_name = body["firstName"]
        last_name = body["lastName"]

        self._user_service.create_user(email, password, first_name, last_name)
        self._identity_service.sign_in(request, email, password)
        user = self._identity_service.get_session_user(request)
        return JsonResponse({"user": serialize_user(user)}, status=201)

    def sign_out(self, request):
        """
        End the current session, if one exists
        """
        self._identity_service.sign_out(
            request)  # succeeds even if no session exists
        return JsonResponse({}, status=200)

    def whoami(self, request):
        """
        Return information about the session user, or an empty object if there
        is no user
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return JsonResponse({}, status=200)

        return JsonResponse({"user": serialize_user(user)}, status=201)
