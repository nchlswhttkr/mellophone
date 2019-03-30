"""
Some views are generic because they are used by many controllers, or because a
request failed to meet a requirement (eg authentication, authorisation).
"""

from django.http.response import JsonResponse


class GenericViews:
    """
    Holds all generic responses for Mellophone as static methods.
    """

    @staticmethod
    def authentication_required_response(request):
        """
        For responses that required the user be in an authenticated session.

        Refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
        """
        response = JsonResponse({}, status=401)
        response['WWW-Authenticate'] = 'Basic'
        return response

    @staticmethod
    def not_found_response(request):
        """
        If a request fails because something required does not exist, this view
        can be used.
        """
        return GenericViews.not_found_response(request)