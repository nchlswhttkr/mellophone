import re
import json
from django.http.response import JsonResponse
from backend.views.generic import GenericViews
from backend.serializers import serialize_meeting


class MeetingController:
    """
    All requests matching /api/meetings/... should be routed through here.
    """

    def __init__(self, identity_service, meeting_service, team_service):
        self._identity_service = identity_service
        self._meeting_service = meeting_service
        self._team_service = team_service

    def get_meeting_by_id(self, request):
        """
        Returns a given meeting and the team that held it, requires the session
        user be a member of said team.

        To check team membership (and thus permission to read meetings), it's
        fine to get the team ID from the meeting itself for now, as retreiving
        meetings is not a particularly expensive operation.
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        meeting_id = int(re.match(r"/api/meetings/([0-9]*)", request.path)[1])
        meeting = self._meeting_service.get_meeting_with_id(meeting_id)

        if self._team_service.is_user_in_team(user, meeting.team.id):
            return JsonResponse(
                {"meeting": serialize_meeting(meeting)},
                status=200
            )

        return GenericViews.forbidden_response(request)

    def get_meetings_of_team(self, request):
        """
        Gets the meetings of a given team.
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]
        meetings = self._meeting_service.get_meetings_of_team(team_id)

        return JsonResponse(
            {
                "meetings": [
                    serialize_meeting(meeting) for meeting in meetings
                ]
            },
            status=200
        )

    def create_meeting_for_team(self, request):
        """
        Creates a meeting for the given team.
        """
        user = self._identity_service.get_session_user(request)
        if user is None:
            return GenericViews.authentication_required_response(request)

        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        venue = body["venue"] if "venue" in body else None

        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]
        meeting = self._meeting_service.create_meeting(team_id, name, venue)

        return JsonResponse({"meeting": serialize_meeting(meeting)}, status=201)
