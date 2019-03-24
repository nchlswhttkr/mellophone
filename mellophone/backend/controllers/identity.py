"""
Handles identity-related routes
"""

import re
import json
from django.http.response import JsonResponse
from backend.services.user import UserService
from backend.services.identity import IdentityService


class IdentityController:
    """
    All requests matching /api/identity/... should be routed through here, and
    connect a request with its appropriate action (usually IdentityService)
    """

    @staticmethod
    def process_request(request):
        """
        POST /sign-in to initiate an authenticated session
        POST /sign-up to create a new user with an authenticated session
        POST /sign-out to end the current session (if one exists)
        GET /whoami to get the identity tied to the current session
        """
        path, method = request.path, request.method

        if re.match(r"/api/identity/sign-in", path) and method == "POST":
            body = json.loads(request.body.decode("utf-8"))
            email = body["email"]
            password = body["password"]

            IdentityService.sign_in(request, email=email, password=password)
            user = IdentityService.get_session_user(request)

            if user is None:
                return JsonResponse({}, status=401)

            return JsonResponse({
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                }
            }, status=200)

        if re.match(r"/api/identity/sign-up", path) and method == "POST":
            body = json.loads(request.body.decode("utf-8"))
            email = body["email"]
            password = body["password"]
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

        if re.match(r"/api/identity/sign-out", path) and method == "POST":
            IdentityService.sign_out(request)
            return JsonResponse({}, status=200)

        if re.match(r"/api/identity/whoami", path) and method == "GET":
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

        return JsonResponse({}, status=404)
