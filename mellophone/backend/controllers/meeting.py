import re
import json
from django.http.response import JsonResponse
from backend.views import GenericViews
from backend.serializers import serialize_meeting, serialize_item
from backend.services.identity import IdentityService
from backend.services.team import TeamService
from backend.services.meeting import MeetingService
from backend.services.permissions import PermissionsService
from backend.services.item import ItemService
from backend.exceptions import ForbiddenException


class MeetingController:
    """
    All requests matching /api/meetings/... should be routed through here.
    """

    def get_meeting_by_id(self, request):
        """
        Returns a given meeting and the team that held it, requires the session
        user be a member of said team.

        To check team membership (and thus permission to read meetings), it's
        fine to get the team ID from the meeting itself for now, as retreiving
        meetings is not a particularly expensive operation.
        """
        user = IdentityService.get_required_session_user(request)
        meeting_id = int(re.match(r"/api/meetings/([0-9]*)", request.path)[1])

        meeting = MeetingService.get(meeting_id)
        if not PermissionsService.can_read_meetings_of_team(user.id, meeting.team.id):
            raise ForbiddenException("You are not allowed to view this meeting")

        return JsonResponse({"meeting": serialize_meeting(meeting)}, status=200)

    def get_meetings_of_team(self, request):
        """
        Gets the meetings of a given team.
        """
        user = IdentityService.get_required_session_user(request)
        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]

        if not PermissionsService.can_read_meetings_of_team(user.id, team_id):
            raise ForbiddenException("You are not allowed to view this team's meetings")

        meetings = MeetingService.get_meetings_of_team_with_id(team_id)
        return JsonResponse(
            {"meetings": [serialize_meeting(meeting) for meeting in meetings]},
            status=200,
        )

    def create_meeting_for_team(self, request):
        """
        Creates a meeting for the given team.
        """
        user = IdentityService.get_required_session_user(request)
        team_id = re.match(r"/api/teams/([0-9]*)/meetings", request.path)[1]
        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        venue = body["venue"] if "venue" in body else ""

        if not PermissionsService.can_write_meetings_of_team(user.id, team_id):
            raise ForbiddenException(
                "You are not allowed to create a meeting for this team"
            )

        meeting = MeetingService.create(team_id, name, venue)
        return JsonResponse({"meeting": serialize_meeting(meeting)}, status=201)

    def get_items_of_meeting(self, request):
        """
        Obtains the items of a meeting
        """
        user = IdentityService.get_required_session_user(request)
        meeting_id = int(re.match(r"/api/meetings/([0-9]*)/items", request.path)[1])

        meeting = MeetingService.get(meeting_id)
        if not PermissionsService.can_write_meetings_of_team(user.id, meeting.team.id):
            raise ForbiddenException(
                "You are not allowed to view the items of this meeting"
            )

        items = ItemService.get_items_of_meeting_with_id(meeting_id)
        return JsonResponse(
            {"items": [serialize_item(item) for item in items]}, status=200
        )

    def post_item_to_meeting(self, request):
        """
        Creates an item within a meeting.
        """
        user = IdentityService.get_required_session_user(request)
        meeting_id = int(re.match(r"/api/meetings/([0-9]*)/items", request.path)[1])
        body = json.loads(request.body.decode("utf-8"))
        name = body["name"]
        description = body["description"]

        meeting = MeetingService.get(meeting_id)
        if not PermissionsService.can_write_meetings_of_team(user.id, meeting.team.id):
            raise ForbiddenException(
                "You are not allowed to create items for this meeting"
            )

        item = ItemService.create(meeting.id, name, description)
        return JsonResponse({"item": serialize_item(item)}, status=201)
