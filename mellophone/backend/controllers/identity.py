"""
Handles identity-related routes
"""

import re
import json
import base64
from django.http.response import JsonResponse
from backend.services.user import UserService
from backend.services.identity import IdentityService
from backend.views.generic import GenericViews


class IdentityController:
    """
    All requests matching /api/identity/... should be routed through here, and
    connect a request with its appropriate action (usually IdentityService)
    """

    @staticmethod
    def process_request(request):
        """
        Passes of the request to the relevant route handler
        """
        path, method = request.path, request.method

        if re.fullmatch(r"/api/identity/sign-in", path) and method == "POST":
            return IdentityController.sign_in(request)

        if re.fullmatch(r"/api/identity/sign-up", path) and method == "POST":
            return IdentityController.sign_up(request)

        if re.fullmatch(r"/api/identity/sign-out", path) and method == "POST":
            return IdentityController.sign_out(request)

        if re.fullmatch(r"/api/identity/whoami", path) and method == "GET":
            return IdentityController.whoami(request)

        return GenericViews.not_found_response(request)

    @staticmethod
    def sign_in(request):
        """
        Attempt to initiate an authenticated session
        """
        credentials = re.fullmatch(
            r"Basic (.*)", request.META['HTTP_AUTHORIZATION'])[1]
        email, password = base64.b64decode(
            credentials.encode()).decode().split(':')

        IdentityService.sign_in(request, email=email, password=password)

        # It is not certain that authenticating will succeed
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        return JsonResponse({
            "user": {
                "id": user.id,
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name,
            }
        }, status=200)

    @staticmethod
    def sign_up(request):
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

        UserService.create_user(email, password, first_name, last_name)
        IdentityService.sign_in(request, email, password)
        user = IdentityService.get_session_user(request)
        return JsonResponse({
            "user": {
                "id": user.id,
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name,
            }
        }, status=201)

    @staticmethod
    def sign_out(request):
        """
        End the current session, if one exists
        """
        IdentityService.sign_out(request)  # succeeds even if no session exists
        return JsonResponse({}, status=200)

    @staticmethod
    def whoami(request):
        """
        Return information about the session user, or an empty object if there
        is no user
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return JsonResponse({}, status=200)

        return JsonResponse({
            "user": {
                "id": user.id,
                "email": user.email,
                "firstName": user.first_name,
                "lastName": user.last_name,
            }
        }, status=200)
