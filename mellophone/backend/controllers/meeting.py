import re
from django.http.response import JsonResponse
from backend.views.generic import GenericViews
from backend.services.identity import IdentityService
from backend.services.meeting import MeetingService
from backend.services.team import TeamService
from backend.serializers import serialize_meeting


class MeetingController:
    """
    All requests matching /api/meetings/... should be routed through here.
    """
    @staticmethod
    def process_request(request):
        """
        Passes of the request to the relevant route handler
        """
        path, method = request.path, request.method

        if re.fullmatch(r"/api/meetings/[0-9]*", path) and method == "GET":
            return MeetingController.get_meeting(request)

        return GenericViews.not_found_response(request)

    @staticmethod
    def get_meeting(request):
        """
        Returns a given meeting and the team that held it, requires the session
        user be a member of said team.

        To check team membership (and thus permission to read meetings), it's
        fine to get the team ID from the meeting itself for now, as retreiving
        meetings is not a particularly expensive operation.
        """
        user = IdentityService.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        meeting_id = int(re.match(r"/api/meetings/([0-9]*)", request.path)[1])
        meeting = MeetingService.get_meeting_with_id(meeting_id)

        if TeamService.is_user_in_team(user, meeting.team.id):
            return JsonResponse(
                {"meeting": serialize_meeting(meeting)},
                status=200
            )

        return GenericViews.forbidden_response(request)
