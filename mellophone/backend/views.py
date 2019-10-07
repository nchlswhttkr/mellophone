from django.http.response import JsonResponse


class GenericViews:
    """
    Holds all generic responses for Mellophone as static methods.

    Some views are generic because they are used by many controllers, or
    because a request failed to meet a requirement (eg authentication,
    authorisation).
    """

    @staticmethod
    def authentication_required_response(request):
        """
        For responses that required the user be in an authenticated session.

        Refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401

        Previously, we would also include the WWW-Authenticate header, but this
        forced the browser to display a login prompt. It's against standards,
        but we removed it to prevent that prompt showing up.
        """
        response = JsonResponse({}, status=401)
        return response

    @staticmethod
    def not_found_response(request):
        """
        If a request fails because something required does not exist, this view
        can be used.
        """
        return JsonResponse({}, status=404)

    @staticmethod
    def forbidden_response(request, error=None):
        """
        If a request is valid but the user is not authorised to view the
        response, this view can be used.
        """
        response = {}
        if error is not None:
            response["error"] = str(error)
        return JsonResponse(response, status=403)

    @staticmethod
    def invalid_request_response(request, error=None):
        """
        If a request is invalid (say a required field is missing), this can be
        used to created a response displaying the error message.
        """
        if error is None:
            error = "Invalid request"
        return JsonResponse({"error": str(error)}, status=400)
