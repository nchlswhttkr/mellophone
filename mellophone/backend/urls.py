# pylint: disable=invalid-name

"""
Route controllers can be declared here, Django will call these as appropriate.

https://docs.djangoproject.com/en/dev/topics/http/urls#how-django-processes-a-request
"""

from django.urls import re_path
from backend.controllers.index import IndexController
from backend.controllers.identity import IdentityController
from backend.controllers.team import TeamController
from backend.controllers.meeting import MeetingController
from backend.views import GenericViews

index_controller = IndexController()
identity_controller = IdentityController()
team_controller = TeamController()
meeting_controller = MeetingController()


def route(path, get=None, post=None, put=None, delete=None):
    """
    Django seems to only let us route a request by its path (and even then only
    by the path after the backend application path, '/api/').

    To get around, we pass our own handler that check the method. This means
    we can keep controllers tied to the objects they handle.
    """
    def handler(request):
        method = request.method
        if method == 'GET' and get is not None:
            return get(request)
        if method == 'POST' and post is not None:
            return post(request)
        if method == 'PUT' and put is not None:
            return put(request)
        if method == 'DELETE' and delete is not None:
            return delete(request)
        return GenericViews.not_found_response(request)

    return re_path(path, handler)


# Remember that all paths are preceded by '/api/' but Django obscures this
urlpatterns = [
    # IDENTITY
    route(r"^identity/sign-in$", post=identity_controller.sign_in),
    route(r"^identity/sign-up$", post=identity_controller.sign_up),
    route(r"^identity/sign-out$", post=identity_controller.sign_out),
    route(r"^identity/whoami$", get=identity_controller.whoami),

    # TEAMS
    route(
        r"^teams$",
        get=team_controller.get_teams_of_user,
        post=team_controller.create_team
    ),
    route(r"^teams/[0-9]*$", get=team_controller.get_team_by_id),

    # MEETINGS
    route(
        r"^teams/[0-9]*/meetings$",
        get=meeting_controller.get_meetings_of_team,
        post=meeting_controller.create_meeting_for_team
    ),
    route(r"^meetings/[0-9]*$", get=meeting_controller.get_meeting_by_id),
    route(
        r"^meetings/[0-9]*/items$",
        get=meeting_controller.get_items_of_meeting,
        post=meeting_controller.post_item_to_meeting
    ),

    # MISC
    route(r"^$", get=index_controller.hello_world),
    re_path(r".*", GenericViews.not_found_response)
]
