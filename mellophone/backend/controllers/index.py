# pylint: disable=too-few-public-methods,no-self-use
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator


class IndexController:
    """
    Any routes that don't belong to a specific controller can go here.

    Routes here are NOT meant to pass off requests to other controllers, this
    is just where orphaned requests can go.

    For now though, it only holds a single view.
    """

    @method_decorator(ensure_csrf_cookie)
    def hello_world(self, request):
        """
        Effectively a "Hello world!" for the backend, but can also be used to
        obtain the 'csrftoken' cookie if the frontend needs it.
        """
        return JsonResponse({"message": "Hello Mellophone!"}, status=200)
