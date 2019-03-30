"""
A controller for routes that do not belong to a more specific controller.
"""

import re
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from backend.views.generic import GenericViews


class IndexController:
    """
    Any routes that don't belong to a specific controller can go here.

    Routes here are NOT meant to pass off requests to other controllers, this
    is just where orphaned requests can go.

    For now though, it only holds a single view.
    """
    @staticmethod
    def process_request(request):
        """
        Passes of the request to the relevant route handler
        """
        path, method = request.path, request.method

        if re.fullmatch(r"/api/", path) and method == "GET":
            return IndexController.hello_world(request)

        return GenericViews.not_found_response(request)

    @staticmethod
    @ensure_csrf_cookie
    def hello_world(request):
        """
        Effectively a "Hello world!" for the backend, but can also be used to get
        the 'csrftoken' cookie if the frontend needs it.
        """
        return JsonResponse({"message": "Hello Mellophone!"}, status=200)
